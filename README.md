# wedding2028

Steven and Michelle's wedding website: Next.js on Vercel, content in Sanity.
The plan is in [Wedding Website PRD.md](./Wedding%20Website%20PRD.md).

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## Where things are

- `app/(site)/` site pages
- `app/studio/` the embedded Sanity Studio
- `components/ui/` shadcn/ui components (copied in, restyle freely)
- `sanity/` schemas, Studio structure and the Sanity client
- `app/globals.css` theme colors, radius and fonts
