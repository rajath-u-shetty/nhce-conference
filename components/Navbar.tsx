// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { usePathname } from "next/navigation";

// import { Button } from "@/components/ui/button";

// import { AlignRight } from "lucide-react";
// import { defaultLinks } from "@/config/nav";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();
//   return (
//     <div className="md:hidden border-b mb-4 pb-2 w-full">
//       <nav className="flex justify-between w-full items-center">
//         <div className="font-semibold text-lg">Logo</div>
//         <Button variant="ghost" onClick={() => setOpen(!open)}>
//           <AlignRight />
//         </Button>
//       </nav>
//       {open ? (
//         <div className="my-4 p-4 bg-muted">
//           <ul className="space-y-2">
//             {defaultLinks.map((link) => (
//               <li key={link.title} onClick={() => setOpen(false)} className="">
//                 <Link
//                   href={link.href}
//                   className={
//                     pathname === link.href
//                       ? "text-primary hover:text-primary font-semibold"
//                       : "text-muted-foreground hover:text-primary"
//                   }
//                 >
//                   {link.title}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : null}
//     </div>
//   );
// }
"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, UserPlus, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [committeesOpen, setCommitteesOpen] = React.useState(false)
  const [authorsOpen, setAuthorsOpen] = React.useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLinkClick = () => {
    setIsOpen(false)
    setCommitteesOpen(false)
    setAuthorsOpen(false)
  }

  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" onClick={handleLinkClick}>
            Logo
          </Link>
          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            <Link href="/" className="hover:text-blue-200" onClick={handleLinkClick}>Home</Link>
            <DropdownMenu open={committeesOpen} onOpenChange={setCommitteesOpen}>
              <DropdownMenuTrigger className="hover:text-blue-200">
                Committees <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/committees/advisory">Advisory Committee</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/committees/technical-organizing">Technical and Organizing Committee</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu open={authorsOpen} onOpenChange={setAuthorsOpen}>
              <DropdownMenuTrigger className="hover:text-blue-200">
                For Authors <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/authors/call-for-papers">Call for Papers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/authors/submission">Submission</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/authors/poster-presentation">Poster Presentation</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/speakers" className="hover:text-blue-200" onClick={handleLinkClick}>Speakers</Link>
            <Link href="/program" className="hover:text-blue-200" onClick={handleLinkClick}>Program</Link>
            <Link href="/registration" className="hover:text-blue-200" onClick={handleLinkClick}>Registration</Link>
            <Link href="/accommodation" className="hover:text-blue-200" onClick={handleLinkClick}>Accommodation</Link>
            <Link href="/gallery" className="hover:text-blue-200" onClick={handleLinkClick}>Gallery</Link>
            <Link href="/history" className="hover:text-blue-200" onClick={handleLinkClick}>History</Link>
            <Link href="/contact" className="hover:text-blue-200" onClick={handleLinkClick}>Contact</Link>
            <Link href='/sign-in' onClick={handleLinkClick}>
              <Button variant="outline" className="text-white border-white hover:bg-blue-800">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign In / Sign Up
              </Button>
            </Link>
          </div>
          <Button variant="ghost" className="lg:hidden text-white ml-auto" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {isOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            <Link href="/" className="block hover:text-blue-200" onClick={handleLinkClick}>Home</Link>
            <DropdownMenu open={committeesOpen} onOpenChange={setCommitteesOpen}>
              <DropdownMenuTrigger className="w-full text-left hover:text-blue-200">
                Committees <ChevronDown className="float-right mt-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/committees/advisory">Advisory Committee</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/committees/technical-organizing">Technical and Organizing Committee</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu open={authorsOpen} onOpenChange={setAuthorsOpen}>
              <DropdownMenuTrigger className="w-full text-left hover:text-blue-200">
                For Authors <ChevronDown className="float-right mt-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/authors/call-for-papers">Call for Papers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/authors/submission">Submission</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLinkClick}>
                  <Link href="/authors/poster-presentation">Poster Presentation</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/speakers" className="block hover:text-blue-200" onClick={handleLinkClick}>Speakers</Link>
            <Link href="/program" className="block hover:text-blue-200" onClick={handleLinkClick}>Program</Link>
            <Link href="/registration" className="block hover:text-blue-200" onClick={handleLinkClick}>Registration</Link>
            <Link href="/accommodation" className="block hover:text-blue-200" onClick={handleLinkClick}>Accommodation</Link>
            <Link href="/gallery" className="block hover:text-blue-200" onClick={handleLinkClick}>Gallery</Link>
            <Link href="/history" className="block hover:text-blue-200" onClick={handleLinkClick}>History</Link>
            <Link href="/contact" className="block hover:text-blue-200" onClick={handleLinkClick}>Contact</Link>
            <Link href='/sign-in' onClick={handleLinkClick}>
              <Button variant="outline" className="w-full text-white border-white hover:bg-blue-800">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign In / Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}