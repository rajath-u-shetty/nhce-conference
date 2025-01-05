"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FlipWords } from "@/components/ui/flip-words";

const words = ["Change", "Enthusiasm", "Inquisitiveness", "Curiosity", "Advancement", "Enhancement", "Development"];

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen">  {/* Changed from flex flex-col */}
        <Navbar />
        <div className="flex flex-col justify-between lg:mt-0 mt-10 min-h-[calc(100vh-64px)]">
          <div className="flex sm:justify-center md:justify-center lg:gap-0 md:gap-4 lg:pl-24 lg:justify-start sm:pt-24 sm:mt-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full px-6 pt-16  md:w-1/2   md:pt-32 lg:mr-14"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white border-white text-base ml-6 md:ml-0 sm:text-xl md:text-xl backdrop-blur-0 py-2 px-4 inline-block border rounded-full sm:mb-8 md:mb-8 text-center md:text-left"
              >
                SCOPUS INDEX PUBLICATIONS
              </motion.div>
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-white pt-11 pb-9 text-4xl md:text-6xl lg:text-7xl font-light leading-tight md:leading-13 mb-4 sm:mb-10 md:mb-8 text-center md:text-left"
              >
                <div className="flex flex-col sm:gap-4">
                  <p className="mb-2 whitespace-nowrap">Celebrating the</p>
                  <p className="mb-2 whitespace-nowrap">Champions of</p>
                </div>
                <div className="flex justify-center md:justify-start sm:mt-6">
                  <FlipWords words={words} />
                </div>
              </motion.h1>
              <motion.p
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-white font-bold text-yellow-200 text-lg md:text-2xl mb-6 text-center md:text-left"
              >
                Technical Papers on Advanced Wireless Communication,<br />
                Power and AI for Smart City (TAPAS 2025)
              </motion.p>
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex justify-center md:justify-start"  // Removed sm:pt-12
              >
                <Link href="/submissions">
                  <Button className="bg-white text-black px-6 md:px-8 md:py-6 rounded-md text-xs font-bold hover:bg-gray-200 sm:text-sm">
                    SUBMISSIONS
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-12 lg:mt-8 mt-4 pb-6 md:pb-8"
          >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 mx-2 md:mx-8">
              <div className="text-white text-xl lg:mx-8 sm:text-2xl md:text-4xl text-center lg:text-left">
                Paper Presentation Date:{" "}
                March 7th & 8th | 2025
              </div>
              <div className="hidden md:block h-16 w-px bg-white/30" />
              <div className="flex flex-col items-center md:items-start">
                <span className="text-white text-xl sm:text-2xl md:text-4xl mb-2 text-center md:text-left">
                  Note:
                </span>
                <span className="text-white text-sm sm:text-base md:text-xl text-center md:text-left">
                  The Scopus index book proceeding will include all accepted papers.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
