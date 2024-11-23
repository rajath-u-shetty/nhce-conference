import React from 'react'

const page = () => {
  	return (
		<div className="lg:ml-20 ml-10 py-10 flex flex-col gap-7 lg:mr-20 font-mono mr-20">
			<div className="text-orange-400 lg:text-2xl font-bold font-mono ">
					SCOPUS INDEX PUBLICATIONS
					<br/><br/>
					<div className="font-bold text-gray-400">ADVISORY COMMITTEE</div>
			</div>
			<div className='flex '>
				<div className="h-screen w-full flex flex-col md:flex-row">
					{/* Left Section */}
					<div className="flex-1  flex flex-col items-center p-4">
						{/* <h2 className="text-2xl font-bold mt-8">Left Section</h2> */}
						{/* Dropdown 1 */}
						<details className="w-full text-orange-300 font-bold shadow-md rounded-lg p-4 mt-4">
						<summary className="cursor-pointer font-bold text-3xl">International Advisory Committee</summary>
						<ul className="mt-2 space-y-2 text-white flex flex-col gap-2 mt-2">
							<li>Dr. Craig Chin: Kennesaw State University, USA</li>
							<li>Dr. Sumit Chakravarty: Kennesaw State University, USA</li>
							<li>Dr. Hassan Tanveer: Kennesaw State University, USA</li>
							<li>Dr. Kamesh Namuduri: Kennesaw State University, USA</li>
							<li>Dr. Aziz Nanthamornphong: Prince of Songkla University, Phuket, Thailand
								<ul>
								<li>Email: aziz.n@phuket.psu.ac.th</li>
								</ul>
							</li>
							<li>Dr. Mohammed H. Alsharif: Sejong University, South Korea</li>
							<li>Dr. Mahmoud A. Albreem: University of Sharjah</li>
							<li>Dr. Dac-Nhuong Le: Institute of Research and Development, Duy Tan University, Danang 550000, Vietnam</li>
							<li>Dr. Ayman A. Aly: Taif University, Saudi Arabia</li>
							<li>Dr. Fahad Alraddady: Taif University, Saudi Arabia</li>
							<li>Dr. Mehedi Masud: Taif University, Saudi Arabia</li>
							<li>Dr. Mohammed A. AlZain: Taif University, Saudi Arabia</li>
							<li>Dr. Samah H. Alajmani: Taif University, Saudi Arabia</li>
						</ul>
						</details>
						{/* Dropdown 2 */}
						{/* <details className="w-full text-orange-300  font-bold shadow-md rounded-lg p-4 mt-4">
						<summary className="cursor-pointer text-lg font-bold">National Advisory Committee</summary>
						<ul className="mt-2 space-y-2">
							<li>Option 1</li>
							<li>Option 2</li>
							<li>Option 3</li>
						</ul>
						</details> */}
					</div>

					{/* Right Section */}
					<div className="flex-1 flex flex-col items-center p-4 ">
						<h2 className="text-3xl font-bold text-red-500 mt-8">Important Dates</h2>
						<div className=" p-6 rounded-lg mt-6 shadow-lg w-full max-w-md bg-slate-700">
							<div className="mb-4">
							<h3 className="text-xl font-bold text-orange-500">Paper Submission Deadline:</h3>
							<p className="text-orange-300 font-bold">January 15th ,2025</p>
							</div>
							<div className="mb-4">
							<h3 className="text-xl font-bold text-orange-500">First Notification Review:</h3>
							<p className="text-orange-300 font-bold">January 30th ,2025</p>
							</div>
							
							<div className="mb-4">
							<h3 className="text-xl font-bold text-orange-500">Final Decision Date:</h3>
							<p className="text-orange-300 font-bold">Feburary 15th ,2025</p>
							</div>
							<div>
							<h3 className="text-xl font-bold text-orange-500">Paper Presentation Date:</h3>
							<p className="text-orange-300 font-bold">7th and 8th March 2025</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
  	)					
}

export default page
