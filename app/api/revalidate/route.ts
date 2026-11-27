import {revalidateTag} from 'next/cache'
import {NextResponse, type NextRequest} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

const supportedTypes = new Set([
  'siteSettings',
  'homePage',
  'storyPage',
  'eventDetailsPage',
  'storyMilestone',
  'event',
  'venue',
])

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({error: 'Webhook secret is not configured'}, {status: 503})
  }

  try {
    const {body, isValidSignature} = await parseBody<{_type?: unknown}>(request, secret)
    if (isValidSignature !== true || !body) {
      return NextResponse.json({error: 'Invalid signature'}, {status: 401})
    }

    if (typeof body._type !== 'string' || !supportedTypes.has(body._type)) {
      return NextResponse.json({error: 'Unsupported document type'}, {status: 400})
    }

    revalidateTag(body._type, {expire: 0})
    return NextResponse.json({revalidated: true, type: body._type})
  } catch {
    return NextResponse.json({error: 'Invalid webhook payload'}, {status: 400})
  }
}
