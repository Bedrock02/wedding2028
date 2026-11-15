'use client'

import {MenuIcon} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

import {Button} from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet'

export type HeaderProps = {
  coupleNames: string
  navItems: {label: string; href: string}[]
}

/** Sticky header: links across the top on wide screens, a Menu button on phones. */
export function Header({coupleNames, navItems}: HeaderProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {coupleNames}
        </Link>

        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild active={pathname === item.href} className="px-4 py-2.5 text-base">
                  <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="lg" className="px-4 md:hidden">
              <MenuIcon aria-hidden="true" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm">
            <SheetHeader>
              <SheetTitle className="font-heading text-2xl">{coupleNames}</SheetTitle>
            </SheetHeader>
            <nav aria-label="Main" className="flex flex-col px-4">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className="border-b py-5 font-heading text-3xl aria-[current=page]:text-gold-deep"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
