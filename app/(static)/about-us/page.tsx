'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
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
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
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
          className="backdrop-blur-0 py-2 px-4 inline-block mb-8 border border-white rounded-full"
          variants={itemVariants}
        >
          <h1 className="text-white text-sm">SCOPUS INDEX PUBLICATIONS</h1>
        </motion.div>

        {/* About NHCE Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <motion.h2
            className="text-white text-3xl mb-6"
            variants={itemVariants}
          >
            About NHCE:
          </motion.h2>
          <motion.p
            className="text-white/90 text-md leading-relaxed"
            variants={itemVariants}
          >
            New Horizon College of Engineering (NHCE), established in 2001, a unit of the New Horizon Educational and Cultural Trust, offers quality education in both Engineering and Management programs. The college is permanently affiliated to Visvesvaraya Technological University (VTU), approved by the All India Council for Technical Education (AICTE), New Delhi. NHCE has the prestigious accreditation of NBA and NAAC with &apos;A&apos; Grade and NIRF ranking. Our college has also reached one more milestone by achieving Autonomous Status from the Academic Year 2015-16 by VTU and Government of Karnataka.
          </motion.p>
        </motion.div>

        {/* About Organizing Department Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <motion.h2
            className="text-white text-3xl mb-6"
            variants={itemVariants}
          >
            About Organizing Department:
          </motion.h2>
          <motion.p
            className="text-white/90 text-md leading-relaxed"
            variants={itemVariants}
          >
            NHCE has established its self-funded incubation centre, New Horizon Council for Innovation Incubation and Entrepreneurship (NHCIIE), CIN: U88900KA2023NPL178028, Not-for-Profit License (NPL) Company under Section 8(1) of the Company Act, 2013, [Formerly, New Horizon Centre for Innovation, Incubation and Entrepreneurship (NHCIIE)], as Incubation/Pre incubation facility. It has dedicated infrastructure facilities like Workspaces, Innovation Lab, Discussion rooms, ED Cell and IPR Cell. NHCIIE has supported over 200 startup ideas from students and staff, with more than 50 startups registered as MSME &apos;Udyam&apos; and 8 incorporated as Private Limited or LLP entities under the Ministry of Corporate Affairs. NHCIIE provides assistance for innovative business ideas from students, staff, and external participants, offering support in areas such as ideation, mentorship, prototyping, collaborations, funding, testing, and access to co-working spaces or workstations at its premises, based on individual case requirements.
          </motion.p>
        </motion.div>

        {/* Scope Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <motion.h2
            className="text-white text-3xl mb-6"
            variants={itemVariants}
          >
            Scope:
          </motion.h2>
          <motion.p
            className="text-white/90 text-md leading-relaxed"
            variants={itemVariants}
          >
            Technical papers on Advanced Wireless Communication, Power and AI for Smart City will bring together leading experts in the fields of wireless communications, power systems, and artificial intelligence. Scheduled for 2025, this event aims to explore innovative advancements and applications of AI in wireless technologies and power systems, including energy-efficient communications and smart power grids. The conference will provide a platform for researchers, engineers, and industry professionals to present their work, share ideas, and collaborate on cutting-edge solutions that integrate AI with communication and energy technologies. Keynote speakers and sessions will cover a wide range of topics, fostering discussions on the future of these converging.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

