'use client'
import React from 'react';
import { motion } from 'framer-motion';

const CommitteeLayout = () => {
  const committeeLeaders = [
    {
      role: 'CHIEF PATRON',
      name: 'Dr. Mohan Manghnani',
      title: 'Founder Chairman',
      institution: 'NHEI, Bengaluru'
    },
    {
      role: 'CHIEF PATRON',
      name: 'Mr. Dharmesh Manghnani',
      title: 'President',
      institution: 'NHEI, Bengaluru'
    },
    {
      role: 'PATRON',
      name: 'Dr. Manjunatha',
      title: 'Principal',
      institution: 'NHCE, Bengaluru'
    },
    {
      role: 'GENERAL CHAIR',
      name: 'Dr. Sanjeev Sharma',
      title: 'Director - NHCIIE',
      institution: 'NHCE, Bengaluru'
    }
  ];

  const programChairs = [
    {
      role: 'PROGRAM CHAIR',
      name: 'Dr. R J Anandhi',
      title: 'Professor and Dean - Academics',
      institution: 'NHCE, Bengaluru'
    },
    {
      role: 'PROGRAM CHAIR',
      name: 'Dr. Revathi V.',
      title: 'Professor and Dean - Research',
      institution: 'NHCE, Bengaluru'
    },
    {
      role: 'CONVENER',
      name: 'Dr. Arun Kumar',
      title: 'Professor - Dept of ECE',
      institution: 'NHCE, Bengaluru'
    },
    {
      role: 'CONVENER',
      name: 'Dr. Mohan Dass',
      title: 'Professor - Dept of EEE',
      institution: 'NHCE, Bengaluru'
    }
  ];

   const organizingCommittee = [
    { name: 'Dr. Anusuya Devi V S', title: 'Professor & Head, Dept of Applied Sciences, NHCE, Bengaluru' },
    { name: 'Dr. Uma Reddy N V', title: 'Professor & Head, Dept of AIML, NHCE, Bengaluru' },
    { name: 'Dr. B Rajalakshmi', title: 'Professor & Head, Dept of CSE, NHCE, Bengaluru' },
    { name: 'Dr. Basawaraju Swathi', title: 'Professor & Head, Dept of CSE-DS, NHCE, Bengaluru' },
    { name: 'Dr. Aravinda Koithyar', title: 'Professor & Head, Dept of ECE, NHCE, Bengaluru' },
    { name: 'Dr. A Sakthivel', title: 'Professor & Head, Dept of EEE, NHCE, Bengaluru' },
    { name: 'Dr. Uma Reddy N V', title: 'Professor & Head, Dept of AIML, NHCE, Bengaluru' },
    { name: 'Dr. Vandana C P', title: 'Professor & Head, Dept of ISE, NHCE, Bengaluru' },
    { name: 'Dr. Rakesh Chandrashekar', title: 'Professor & Head, Dept of ME, NHCE, Bengaluru' },
    { name: 'Dr. Rose Kavitha', title: 'Professor & Head, Dept of MBA, NHCE, Bengaluru' },
    { name: 'Dr. Asha V', title: 'Professor & Head, Dept of MCA, NHCE, Bengaluru' }
  ];

  const technicalCommittee = [
    { name: 'Dr. A B Madhu Mohana Raju', title: 'Professor, Dept of Applied Sciences, NHCE, Bengaluru' },
    { name: 'Dr. B Nithya Ramesh', title: 'Professor, Dept of MCA, NHCE, Bengaluru' },
    { name: 'Dr. C Rathish', title: 'Professor, Dept of CSE, NHCE, Bengaluru' },
    { name: 'Dr. Gurulakshmi A B', title: 'Professor, Dept of ECE, NHCE, Bengaluru' },
    { name: 'Dr. Joshua Daniel Raj J', title: 'Professor, Dept of CSE - DS, NHCE, Bengaluru' },
    { name: 'Dr. Kavitha T', title: 'Professor, Dept of CSE, NHCE, Bengaluru' },
    { name: 'Dr. K Gopal', title: 'Professor, Dept of ME, NHCE, Bengaluru' },
    { name: 'Dr. M S Raghu', title: 'Professor, Dept of Applied Sciences, NHCE, Bengaluru' },
    { name: 'Dr. Mausri Bhuyan', title: 'Professor, Dept of EEE, NHCE, Bengaluru' },
    { name: 'Dr. Priyameet Kaur', title: 'Professor, Dept of MBA, E, Bengaluru' },
    { name: 'Dr. Rajesh G', title: 'Professor, Dept of ECE, NHCE, Bengaluru' },
    { name: 'Dr. Ramachandra Naik', title: 'Professor, Dept of R&D, NHCE, Bengaluru' },
    { name: 'Dr. Santhosh Krishna BV', title: 'Professor, Dept of CSE, NHCE, Bengaluru' },
    { name: 'Dr. Siva Ramakrishnan S', title: 'Professor, Dept of ISE, NHCE, Bengaluru' },
    { name: 'Mr. Syam Dev R S', title: 'Professor, Dept of AIML, NHCE, Bengaluru' },
    { name: 'Dr. Vinoth Kumar K', title: 'Professor and Associate Head - R&D, Dept of EEE, NHCE, Bengaluru' }
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

  const listItemVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="relative min-h-screen mt-28 lg:mx-16">
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
          className="text-white text-4xl mb-8 font-sans "
          variants={itemVariants}
        >
          COMMITTEES
        </motion.h2>

        <motion.div 
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          variants={containerVariants}
        >
          {committeeLeaders.map((leader, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-0 bg-[rgba(24,24,24,0.6)] p-6 text-white rounded-sm shadow-md border border-white/20"
              variants={itemVariants}
            >
              <h3 className="text-md font-bold mb-2">{leader.role}</h3>
              <p className="text-sm mb-1">{leader.name}</p>
              <p className="text-xs text-gray-300">{leader.title}</p>
              <p className="text-xs text-gray-300">{leader.institution}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 text-center"
          variants={containerVariants}
        >
          {programChairs.map((chair, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-0 bg-[rgba(24,24,24,0.6)] p-6 text-white rounded-lg shadow-md border border-white/20"
              variants={itemVariants}
            >
              <h3 className="text-md font-bold mb-2">{chair.role}</h3>
              <p className="text-sm mb-1">{chair.name}</p>
              <p className="text-xs text-gray-300">{chair.title}</p>
              <p className="text-xs text-gray-300">{chair.institution}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-white text-xl mb-8"
            variants={itemVariants}
          >
            ORGANIZING COMMITTEE
          </motion.h2>
          <motion.div 
            className="grid lg:grid-cols-2 sm:grid-cols-1 gap-8"
            variants={containerVariants}
          >
            <motion.div 
              className="backdrop-blur-0 bg-[rgba(24,24,24,0.6)] p-6 text-white rounded-lg shadow-md border border-white/20"
              variants={itemVariants}
            >
              {organizingCommittee.slice(0, Math.ceil(organizingCommittee.length/2)).map((member, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-2 mb-3"
                  variants={listItemVariants}
                >
                  <span className="text-xs">•</span>
                  <p className="text-xs text-white">{member.name}, {member.title}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="backdrop-blur-0 bg-[rgba(24,24,24,0.6)] p-6 text-white rounded-lg shadow-md border border-white/20"
              variants={itemVariants}
            >
              {organizingCommittee.slice(Math.ceil(organizingCommittee.length/2)).map((member, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-2 mb-3"
                  variants={listItemVariants}
                >
                  <span className="text-xs">•</span>
                  <p className="text-xs text-white">{member.name}, {member.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-12 mb-20"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-white text-xl mb-8"
            variants={itemVariants}
          >
            TECHNICAL PROGRAMME COMMITTEE
          </motion.h2>
          <motion.div 
            className="grid lg:grid-cols-2 sm:grid-cols-1 gap-8"
            variants={containerVariants}
          >
            <motion.div 
              className="backdrop-blur-0 bg-[rgba(24,24,24,0.6)] p-6 text-white rounded-lg shadow-md border border-white/20"
              variants={itemVariants}
            >
              {technicalCommittee.slice(0, Math.ceil(technicalCommittee.length/2)).map((member, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-2 mb-3"
                  variants={listItemVariants}
                >
                  <span className="text-xs">•</span>
                  <p className="text-xs text-white">{member.name}, {member.title}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="backdrop-blur-0 bg-[rgba(24,24,24,0.6)] p-6 text-white rounded-lg shadow-md border border-white/20"
              variants={itemVariants}
            >
              {technicalCommittee.slice(Math.ceil(technicalCommittee.length/2)).map((member, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-2 mb-3"
                  variants={listItemVariants}
                >
                  <span className="text-xs">•</span>
                  <p className="text-xs text-white">{member.name}, {member.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CommitteeLayout;
