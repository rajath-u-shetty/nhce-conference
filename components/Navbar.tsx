
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="backdrop-blur-lg text-primary-foreground py-4 "> {/* Reduced padding */}
      <div className=" mx-20 ">
        <div className="flex items-center gap-4 ">
          {/* Logo on the left */}
          <Link href="/" className="flex-shrink-0 flex flex-row gap-6">
            <Image
              src="/NHCE White Logo Transparent.png"
              alt='logo'
              width={250}
              height={50}
              className="object-contain max-w-full" // Add these classes
            />
            
            <Image
              src="/IEEE-NHCE-SB-Blue-Landscape.png"
              alt='logo'
              height={50}  // Adjusted height
              width={150}  // Adjusted width
              className="z-10"
            />
          </Link>

          {/* Navigation items on the right */}
          <div className="hidden lg:flex items-center space-x-2 ml-auto gap-6"> {/* Added space-x-2 for consistent spacing */}
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-1 gap-6">
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 
                      "text-white hover:bg-red-700 hover:text-white px-3 py-2 text-sm font-medium")}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/submissions" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 
                      "text-white hover:bg-red-700 hover:text-white px-3 py-2 text-sm font-medium")}>
                      Submissions
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Sign in button */}
            <Link href='/sign-in' className="ml-4">
              <Button variant="outline" className="text-white border-white hover:bg-red-700 text-sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <Button variant="ghost" className="lg:hidden text-white bg-blue-800 flex flex-e" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile menu */}
        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 py-2 space-y-1 flex flex-col ">
            {/* Adjust the flex direction to column and align items to end */}
            <Link href="/" className="block text-white hover:bg-white/10 px-3 py-2 text-sm">Home</Link>
            <Link href="/submissions" className="block text-white hover:bg-white/10 px-3 py-2 text-sm">Submissions</Link>
            <Link href='/sign-in' className="block px-3 py-2">
              <Button variant="outline" className="w-full text-white border-white hover:bg-white/10 text-sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}