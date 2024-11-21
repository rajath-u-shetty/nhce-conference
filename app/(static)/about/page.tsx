import React from 'react'

const page = () => {
  return (
    <div className='ml-20  max-w-xl py-10 flex flex-col gap-10 font-mono'>
      <div className='flex flex-col gap-5'>
        <div className='text-3xl font-bold text-orange-400'>
          *SCOPUS INDEX PUBLICATIONS*
          <br/>
          <div className='text-gray-400'>
            ABOUT ORGANIZING DEPARTMENT:
            </div>
        </div>
        <p className='font-mono text-justify backdrop-blur-md text-orange-300 '>
          NHCE has established its self-funded incubation centre, “New Horizon Council for Innovation Incubation and Entrepreneurship (NHCIIE), CIN: U88900KA2023NPL178028, Not-for-Profit License (NPL) Company under Section 8(1) of the Company Act, 2013, [Formerly, New Horizon Centre for Innovation, Incubation and Entrepreneurship (NHCIIE)], as Incubation/Pre incubation facility. It has dedicated infrastructure facilities like Workspaces, Innovation Lab, Discussion rooms, ED Cell and IPR Cell. NHCIIE has supported over 200 startup ideas from students and staff, with more than 50 startups registered as MSME ‘Udyam’ and 8 incorporated as Private Limited or LLP entities under the Ministry of Corporate Affairs. NHCIIE provides assistance for innovative business ideas from students, staff, and external participants, offering support in areas such as ideation, mentorship, prototyping, collaborations, funding, testing, and access to co-working spaces or workstations at its premises, based on individual case requirements.
        </p> 
      </div>
      <div className='flex flex-col gap-5'>
        <div className='text-3xl font-bold text-gray-400'>
          About NHCE:
        </div>
        <p className='font-mono backdrop-blur-md text-justify text-orange-300 '>
          New Horizon College of Engineering (NHCE), established in 2001, a unit of the New Horizon Educational and Cultural Trust, offers quality education in both Engineering and Management programs. The college is permanently affiliated to Visvesvaraya Technological University (VTU), approved by the All India Council for Technical Education (AICTE), New Delhi. NHCE has the prestigious accreditation of NBA and NAAC with 'A' Grade and NIRF ranking. Our college has also reached one more milestone by achieving Autonomous Status from the Academic Year 2015-16 by VTU and Government of Karnataka.
        </p> 

      </div>
    </div>
  )
}

export default page