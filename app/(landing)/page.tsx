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
      <Navbar />
      <div className="flex flex-col sm:justify-evenly justify-between lg:mt-1 mt-10 min-h-screen">
        <div className="flex flex-col items-center lg:items-start sm:justify-center md:justify-center md:gap-4 lg:pl-24 sm:pt-24 sm:mt-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full px-6 pt-16 md:w-3/4 lg:w-1/2 md:pt-32"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-white text-sm sm:text-base md:text-xl mb-4 sm:mb-8 text-center md:text-left"
            >
              SCOPUS INDEX PUBLICATIONS
            </motion.div>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-mono pt-6 pb-6 font-light leading-snug md:leading-tight text-center md:text-left"
            >
              <div className="flex flex-col gap-2">
                <p className="mb-2 whitespace-nowrap">Celebrating the</p>
                <p className="mb-2 whitespace-nowrap">Champions of</p>
              </div>
              <div className="flex justify-center md:justify-start mt-4">
                <FlipWords words={words} />
              </div>
            </motion.h1>
            <motion.p
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-white text-sm sm:text-base md:text-xl font-bold text-yellow-200 mb-4 sm:mb-6 md:mb-8 text-center md:text-left"
            >
              Technical Papers on Advanced Wireless Communication,
              <br />
              Power and AI for Smart City
            </motion.p>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex justify-center md:justify-start pt-4"
            >
              <Link href="/submissions">
                <Button className="bg-white text-black px-4 py-3 md:px-6 md:py-4 rounded-md text-xs sm:text-sm font-bold hover:bg-gray-200">
                  SUBMISSIONS
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Paper Presentation Date Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-12 pt-8 sm:pt-12"
        >
          <div className="text-white text-sm sm:text-lg md:text-2xl text-center">
            Paper Presentation Date:{" "}
            <span className="font-semibold text-white whitespace-nowrap">
              March 7th & 8th | 2025
            </span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="w-full px-4 sm:px-6 md:px-12 py-4 bg-black text-center"
        >
          <span className="text-white text-xs sm:text-sm md:text-base">
            The Scopus index book proceeding will include all accepted papers.
          </span>
        </motion.div>
      </div>
    </>
  );
}
