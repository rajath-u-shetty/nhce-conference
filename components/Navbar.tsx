"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {data: session} = useSession();

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

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        height: { duration: 0.3 }
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        height: { duration: 0.3 }
      }
    }
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md"
    >
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logos */}
          <motion.div
            variants={childVariants}
            className="flex items-center gap-2 md:gap-4"
          >
            <Link href="/">
              <Image
                src="/image/NHCEFinalLogoWhite.png"
                alt="nhcelogo"
                width={200}
                height={50}
                className="w-auto h-8 md:h-12"
              />
            </Link>
            <Link href="/">
              <Image
                src="/IEEE-NHCE-SB-white-black-Landscape.png"
                alt="ieeelogo"
                height={50}
                width={100}
                className="w-auto h-7 md:h-11"
              />
            </Link>
            <Link href="/">
              <Image
                src="/QX25 Logo White SVG.png"
                alt="qxlogo"
                height={50}
                width={80}
                className="w-auto h-7 md:h-11"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            variants={childVariants}
            className="hidden md:flex items-center gap-8"
          >
            <NavigationMenu>
              <NavigationMenuList className="flex gap-8">
                {["Advisory Committee", "Organizing Committee", "About Us", "Submissions"].map((item) => (
                  <motion.div key={item} variants={childVariants}>
                    <NavigationMenuItem>
                      <Link href={`/${item.toLowerCase().replace(" ", "-")}`} legacyBehavior passHref>
                        <NavigationMenuLink className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
                          {item}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </motion.div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <motion.div variants={childVariants}>
              <Link href={session?.user.id ? "/dashboard" : "/sign-in"}>
                <Button variant="ghost" className="text-white hover:text-gray-300 font-medium">
                  {session?.user.id ? "Dashboard" : "Sign In"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            variants={childVariants}
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          className="md:hidden overflow-hidden"
        >
          <div className="px-4 pt-4 pb-6 space-y-4">
            {["Advisory Committee", "Organizing Committee", "About Us", "Submissions","Sign in"].map((item) => (
              <motion.div
                key={item}
                variants={childVariants}
                className="block"
              >
                <Link 
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-white hover:text-gray-300 transition-colors text-sm font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
