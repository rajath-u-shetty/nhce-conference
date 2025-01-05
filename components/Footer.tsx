'use client'
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-black/30 backdrop-blur-0 mt-20 text-white"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <motion.div variants={childVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <Image
                src="/image/NHCEFinalLogoWhite.png"
                alt="nhcelogo"
                width={150}
                height={40}
                className="w-auto h-8"
              />
              <Image
                src="/QX25 Logo White SVG.png"
                alt="qxlogo"
                width={60}
                height={40}
                className="w-auto h-8"
              />
            </div>
            <p className="text-sm text-gray-300">
              The Third Techno - Management fest of New Horizon College of Engineering.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div variants={childVariants} className="space-y-6">
            <h2 className="text-2xl font-semibold text-purple-300">Contact Us</h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">QuantumX - 2025</h3>
              <p className="text-sm text-gray-300">
                New Horizon College of Engineering
                <br />
                Ring Road, Bellandur Post,
                <br />
                Bangalore - 560103
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <motion.div 
          variants={childVariants}
          className="mt-8 pt-4 border-t border-white/10 text-center text-sm text-gray-400"
        >
          <p>© {new Date().getFullYear()} QuantumX. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
