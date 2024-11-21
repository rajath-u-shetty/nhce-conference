import React from 'react'

const page = () => {
  	return (
		<div className="lg:ml-20 ml-10 py-10 flex flex-col gap-7 lg:mr-20 font-mono mr-20">
			<div className="text-orange-400 lg:text-2xl font-bold font-mono ">
					*SCOPUS INDEX PUBLICATIONS*
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
						<summary className="cursor-pointer text-lg font-bold">International Advisory Committee</summary>
						<ul className="mt-2 space-y-2">
							<li>Item 1</li>
							<li>Item 2</li>
							<li>Item 3</li>
						</ul>
						</details>
						{/* Dropdown 2 */}
						<details className="w-full text-orange-300  font-bold shadow-md rounded-lg p-4 mt-4">
						<summary className="cursor-pointer text-lg font-bold">National Advisory Committee</summary>
						<ul className="mt-2 space-y-2">
							<li>Option 1</li>
							<li>Option 2</li>
							<li>Option 3</li>
						</ul>
						</details>
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
							<h3 className="text-xl font-bold text-orange-500">First Notification Review</h3>
							<p className="text-orange-300 font-bold">January 30th ,2025</p>
							</div>
							
							<div className="mb-4">
							<h3 className="text-xl font-bold text-orange-500">Final Decision date</h3>
							<p className="text-orange-300 font-bold">Feburary 15th ,2025</p>
							</div>
							<div>
							<h3 className="text-xl font-bold text-orange-500">Conference Date:</h3>
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
