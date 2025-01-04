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
      <div className="flex flex-col justify-between h-screen">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-1/2 px-12 pt-32 mx-8"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white text-xl mb-8"
          >
            SCOPUS INDEX PUBLICATIONS
          </motion.div>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white text-7xl font-light leading-13 mb-8"
          >
            <p className="mb-2">Celebrating the</p>
            <p className="mb-2">Champions of</p>
            <FlipWords words={words} />
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white text-xl mb-8"
          >
            Technical Papers on Advanced Wireless Communication,<br />
            Power and AI for Smart City
          </motion.p>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link href="/submissions">
              <Button className="bg-white text-black px-8 py-6 rounded-md text-xs font-bold hover:bg-gray-200">
                SUBMISSIONS
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full px-12 pb-8"
        >
          <div className="flex items-center justify-center gap-8 mx-8">
            <div className="text-white text-4xl ">
              Paper Presentation Date: March 7th & 8th | 2025
            </div>
            <div className="h-16 w-px bg-white/30" /> {/* Vertical separator */}
            <div className="flex flex-col">
              <span className="text-white text-4xl mb-2">Note:</span>
              <span className="text-white text-xl">
                The Scopus index book proceeding will include all accepted papers.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
