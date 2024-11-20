import React from 'react'

const page = () => {
  return (
    <div className='ml-20  max-w-xl py-10 flex flex-col gap-10 font-mono'>
      <div className='flex flex-col gap-5'>
        <div className='text-3xl font-bold text-orange-600'>
          IAWCPASC - 2025
			
				  <br />
				  <br />
				  <div className='text-gray-400'>
          ABOUT CONFERENCE
          </div>
        </div>
        <p className='font-mono backdrop-blur-md text-orange-300 '>
          The First International Conference on Wireless Communication, Power, and AI (IWCPA-2025) will bring together leading experts in the fields of wireless communications, power systems, and artificial intelligence. Scheduled for 2025, this event aims to explore innovative advancements and applications of AI in wireless technologies and power systems, including energy-efficient communications and smart power grids. The conference will provide a platform for researchers, engineers, and industry professionals to present their work, share ideas, and collaborate on cutting-edge solutions that integrate AI with communication and energy technologies. Keynote speakers and sessions will cover a wide range of topics, fostering discussions on the future of these converging.
        </p> 
      </div>
      <div className='flex flex-col gap-5'>
        <div className='text-3xl font-bold text-orange-600'>
          <div className='text-red-600'>
          TERMS & CONDITIONS
          </div>
        </div>
        <p className='font-mono backdrop-blur-md text-orange-300 '>
          The authors can present their paper through virtual mode (limited) and physical presentation. The registration fees will remain same for both. For authors, one regular registration covers one accepted paper.
        </p> 
      </div>
    </div>
  )
}

export default page