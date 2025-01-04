'use client'
import React from 'react';
import { motion } from 'framer-motion';

const CommitteePage = () => {
  const committeeMembers = [
    {
      name: "Dr. Craig Chin",
      institution: "Kennesaw State University",
      country: "USA"
    },
    {
      name: "Dr. Sumit Chakravarty",
      institution: "Kennesaw State University",
      country: "USA"
    },
    {
      name: "Dr. Hassan Tanveer",
      institution: "Kennesaw State University",
      country: "USA"
    },
    {
      name: "Dr. Kamesh Namuduri",
      institution: "Kennesaw State University",
      country: "USA"
    },
    {
      name: "Dr. Mohammed H. Alsharif",
      institution: "Sejong University",
      country: "South Korea"
    },
    {
      name: "Dr. Mahmoud A. Albreem",
      institution: "University of Sharjah",
      country: "Sharjah"
    },
    {
      name: "Dr. Ayman A. Aly",
      institution: "Taif University",
      country: "Saudi Arabia"
    },
    {
      name: "Dr. Fahad Alraddady",
      institution: "Taif University",
      country: "Saudi Arabia"
    },
    {
      name: "Dr. Mehedi Masud",
      institution: "Taif University",
      country: "Saudi Arabia"
    },
    {
      name: "Dr. Mohammed A. AlZain",
      institution: "Taif University",
      country: "Saudi Arabia"
    },
    {
      name: "Dr. Samah H. Alajmani",
      institution: "Taif University",
      country: "Saudi Arabia"
    },
    {
      name: "Dr. Dac-Nhuong Le",
      institution: "Institute of R & D",
      country: "Vietnam"
    },
    {
      name: "Dr. Aziz Nanthamornphong",
      institution: "Prince of Songkla University",
      country: "Thailand",
      location: "Phuket",
      email: "aziz.n@phuket.psu.ac.th"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative min-h-screen mt-28 mx-16" style={{
      backgroundImage: "url('/background-image.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <motion.div
        className="relative z-10 container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="backdrop-blur-0 py-2 px-2 inline-block mb-8 border border-white rounded-full"
          variants={itemVariants}
        >
          <h1 className="text-white text-sm">SCOPUS INDEX PUBLICATIONS</h1>
        </motion.div>

        <motion.h2
          className="text-white text-3xl mb-8 font-sans"
          variants={itemVariants}
        >
          International Advisory Committee
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-center"
          variants={containerVariants}
        >
          {committeeMembers.map((member, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-0 bg-[rgba(22,22,22,0.6)] mx-1 p-5 text-white rounded-sm shadow-md border border-white/20"
              variants={itemVariants}
            >
              <h3 className="text-md mb-2">{member.name}</h3>
              <p className="text-xs text-gray-300">{member.institution}</p>
              <p className="text-xs text-gray-300">{member.country}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20"
          variants={containerVariants}
        >
          <motion.h2
            className="text-white text-3xl mb-16"
            variants={itemVariants}
          >
            Important Dates
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 mb-20 md:grid-cols-2 lg:grid-cols-4 gap-20 relative"
            variants={containerVariants}
          >
            {[
              {
                title: "Paper Submission Deadline:",
                date: "January 15th, 2025"
              },
              {
                title: "First Notification Review:",
                date: "January 30th, 2025"
              },
              {
                title: "Final Decision Date:",
                date: "February 15th, 2025"
              },
              {
                title: "Paper Presentation Date:",
                date: "7th and 8th March, 2025"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-white relative"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 100
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 50,
                      damping: 20,
                      delay: index * 0.3
                    }
                  }
                }}
              >
                <h3 className="text-2xl font-light mb-4">{item.title}</h3>
                <p className="text-lg text-white/90">{item.date}</p>
                {/* Add vertical separator after each item except the last one */}
                {index < 3 && (
                  <motion.div
                    className="absolute top-0 right-[-40px] h-full w-[1px] bg-white/30"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      delay: (index * 0.3) + 0.5,
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CommitteePage;
