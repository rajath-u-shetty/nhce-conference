"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setHasScrolled(latest > 0);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "fixed top-0 left-0 right-0 z-20 px-6 py-4",
        hasScrolled 
          ? "bg-black transition-colors duration-300" 
          : "bg-transparent transition-colors duration-300"
      )}
    >
      <div className="flex justify-between items-center">
        <motion.div
          variants={childVariants}
          className="flex items-center gap-4"
        >
          <Image 
            src="/NHCE White Logo Transparent.png" 
            alt="nhcelogo" 
            width={200} 
            height={50} 
            className="w-auto h-11" 
          />
          <Image 
            src="/IEEE-NHCE-SB-white-black-Landscape.png" 
            alt="ieeelogo" 
            height={50} 
            width={100} 
            className="w-auto h-11" 
          />
          <Image 
            src="/QX25 Logo White SVG.png" 
            alt="qxlogo" 
            height={50} 
            width={80} 
            className="w-auto h-11" 
          />
        </motion.div>
        <motion.div
          variants={childVariants}
          className="flex items-center gap-8"
        >
          <NavigationMenu>
            <NavigationMenuList className="flex gap-8">
              {["Advisory Committee", "Organizing Committee", "About Us", "Submissions"].map((item, i) => (
                <motion.div
                  key={item}
                  variants={childVariants}
                >
                  <NavigationMenuItem>
                    <Link href={`/${item.toLowerCase().replace(" ", "-")}`} legacyBehavior passHref>
                      <NavigationMenuLink 
                        className={cn(
                          "text-white hover:text-gray-300 transition-colors text-sm font-medium"
                        )}
                      >
                        {item}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </motion.div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <motion.div variants={childVariants}>
            <Link href="/sign-in">
              <Button 
                variant="ghost" 
                className="text-white hover:text-gray-300 font-medium"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
