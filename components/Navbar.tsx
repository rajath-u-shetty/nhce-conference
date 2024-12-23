'use client'
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, UserPlus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import router from "next/router";
import { signIn, useSession } from "next-auth/react";

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
  );
});
ListItem.displayName = "ListItem";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <nav className="backdrop-blur-lg text-primary-foreground py-2 md:py-4 relative z-20">
      <div className="px-1 md:mx-20">
        <div className="flex items-center justify-between">
          {/* Logo container with horizontal scroll on mobile */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 md:gap-2 min-w-max">
              <Link href="/" className="flex mx-1 items-center space-x-2 gap-1">
                <Image
                  src="/NHCE White Logo Transparent.png"
                  alt='nhcelogo'
                  width={180}
                  height={36}
                  className="w-auto h-7 md:h-12"
                />
                <Image
                  src="/IEEE-NHCE-SB-white-black-Landscape.png"
                  alt='ieeelogo'
                  height={36}
                  width={100}
                  className="w-auto h-7 md:h-12"
                />
                <Image
                  src="/QX25 Logo White SVG.png"
                  alt='qxlogo'
                  height={36}
                  width={80}
                  className="w-auto h-7 md:h-12"     
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 ml-4">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-1 gap-1">
                {/* <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(),
                      "text-white hover:text-white px-3 py-2 text-sm font-medium")}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem> */}
                <NavigationMenuItem>
                  <Link href="/committees/advisory" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-slate-800 text-slate-100 dark:text-slate-100 hover:text-slate-100 dark:hover:text-slate-100 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                    )}>

                      Advisory Committee
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/organizing-committee" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-slate-800 text-slate-100 dark:text-slate-100 hover:text-slate-100 dark:hover:text-slate-100 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                    )}>

                      Organizing Committee
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-slate-800 text-slate-100 dark:text-slate-100 hover:text-slate-100 dark:hover:text-slate-100 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                    )}>

                      About us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/submission" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-slate-800 text-slate-100 dark:text-slate-100 hover:text-slate-100 dark:hover:text-slate-100 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                    )}>

                      Submissions
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href={session ? session.user.role === 'ADMIN' ? '/admin' : '/dashboard' : '/sign-in'}
              onClick={(e) => {
                if (!session) {
                  e.preventDefault();
                  signIn("google", { callbackUrl: "/submission" });
                }
              }}
              className="ml-4"
            >
              <Button
                variant="outline"
                className="bg-transparent hover:bg-slate-800 text-slate-100 dark:text-slate-100 hover:text-slate-100 dark:hover:text-slate-100 border-slate-100 dark:border-slate-100 text-sm transition-colors"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                {session ? session.user.role === 'ADMIN' ? 'Admin' : 'Dashboard' : 'Sign In'}
              </Button>
            </Link>
          </div>
          <br />
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="lg:hidden text-white hover:bg-white/10 p-2"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg z-50">
            <div className="px-4 py-4 space-y-3">
              {/* <Link
                href="/"
                className="block text-white rounded-md px-4 py-2 text-base font-medium transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link> */}
              <Link
                href="/committees/advisory"
                className="block text-white rounded-md px-4 py-2 text-base font-medium transition-colors"
                onClick={toggleMenu}
              >
                Advisory Committee
              </Link>
              <Link
                href="/organizing-committee"
                className="block text-white rounded-md px-4 py-2 text-base font-medium transition-colors"
                onClick={toggleMenu}
              >
                Organizing Committee
              </Link>
              <Link
                href="/about"
                className="block text-white rounded-md px-4 py-2 text-base font-medium transition-colors"
                onClick={toggleMenu}
              >
                About us
              </Link>
              <Link
                href="/submission"
                className="block text-white rounded-md px-4 py-2 text-base font-medium transition-colors"
                onClick={toggleMenu}
              >
                Submissions
              </Link>
              <Link
                href={session ? session.user.role === 'ADMIN' ? '/admin' : '/dashboard' : '/sign-in'}
                className="block" onClick={toggleMenu}>
                <Button variant="outline" className="w-full text-white border-white text-base">
                  <UserPlus className="mr-2 h-5 w-5" />
                  {session ? session.user.role === 'ADMIN' ? 'Admin' : 'Dashboard' : 'Sign In'}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
