import React from 'react';

const Page = () => {
  return (
    <>
      <div className="flex font-mono -pt-2">
        {/* Left Section - Organizing Committee and Technical Programme Committee */}
        <div className="flex-1">
          {/* Organizing Committee Section */}
          <div className="text-orange-400 text-2xl ml-20 pt-9 font-bold font-mono">
					  SCOPUS INDEX PUBLICATIONS
					  <br/>
            <div className="font-bold text-3xl text-gray-400 pt-7">
            COMMITTEES
            </div>
          </div>

          <div className="flex flex-col items-center ml-20 p-4">
            {/* CHIEF PATRON */}
            <details open className="w-full text-orange-300 font-bold shadow-md rounded-lg p-4 mt-4">
              <summary className="cursor-pointer text-lg font-bold">CHIEF PATRON</summary>
              <ul className="mt-2 space-y-2 text-white font-medium">
                <li>Dr. Mohan Manghnani, Founder Chairman, NHEI, Bengaluru</li>
                <li>Mr. Dharmesh Manghnani, President, NHEI, Bengaluru</li>
              </ul>
            </details>

            {/* PATRON */}
            <details className="w-full text-orange-300 font-bold shadow-md rounded-lg p-4 mt-4">
              <summary className="cursor-pointer text-lg font-bold">PATRON</summary>
              <ul className="mt-2 space-y-2 text-white font-medium">
                <li>Dr. Manjunatha, Principal, NHCE, Bengaluru</li>
              </ul>
            </details>

            {/* GENERAL CHAIR */}
            <details className="w-full text-orange-300 font-bold shadow-md rounded-lg p-4 mt-4">
              <summary className="cursor-pointer text-lg font-bold">GENERAL CHAIR</summary>
              <ul className="mt-2 space-y-2 text-white font-medium">
                <li>Dr. Sanjeev Sharma, Director - NHCIIE, NHCE, Bengaluru</li>
              </ul>
            </details>

            {/* PROGRAM CHAIR */}
            <details className="w-full text-orange-300 font-bold shadow-md rounded-lg p-4 mt-4">
              <summary className="cursor-pointer text-lg font-bold">PROGRAM CHAIR</summary>
              <ul className="mt-2 space-y-2 text-white font-medium">
                <li>Dr. Revathi V., Professor and Dean - Research, NHCE, Bengaluru</li>
                <li>Dr. R J Anandhi, Professor and Dean - Academics, NHCE, Bengaluru</li>
              </ul>
            </details>

            {/* CONVENER */}
            <details className="w-full text-orange-300 font-bold shadow-md rounded-lg p-4 mt-4">
              <summary className="cursor-pointer text-lg font-bold">CONVENER</summary>
              <ul className="mt-2 space-y-2 text-white font-medium">
                <li>Dr. Arun Kumar, Professor, Dept of ECE, NHCE, Bengaluru</li>
                <li>Dr. Mohan Dass, Professor, Dept of EEE, NHCE, Bengaluru</li>
              </ul>
            </details>

            {/* ORGANIZING SECRETARIES */}
            <details className="w-full text-orange-300 font-bold shadow-md rounded-lg p-4 mt-4">
              <summary className="cursor-pointer text-lg font-bold">ORGANIZING COMMITTEE</summary>
              <ul className="mt-2 space-y-2 text-white font-medium">
              <li>Dr. Anusuya Devi V S, Professor & Head, Dept of Applied Sciences, NHCE, Bengaluru</li>
              <li>Dr. Uma Reddy N V, Professor & Head, Dept of AIML, NHCE, Bengaluru</li>
              <li>Dr. B Rajalakshmi, Professor & Head, Dept of CSE, NHCE, Bengaluru</li>
              <li>Dr. Basawaraju Swathi, Professor & Head, Dept of CSE-DS, NHCE, Bengaluru</li>
              <li>Dr. Aravinda Koithyar, Professor & Head, Dept of ECE, NHCE, Bengaluru</li>
              <li>Dr. A Sakthivel, Professor & Head, Dept of EEE, NHCE, Bengaluru</li>
              <li>Dr. Vandana C P, Professor & Head, Dept of ISE, NHCE, Bengaluru</li>
              <li>Dr. Rakesh Chandrashekar, Professor & Head, Dept of ME, NHCE, Bengaluru</li>
              <li>Dr. Rose Kavitha, Professor & Head, Dept of MBA, NHCE, Bengaluru</li>
              <li>Dr. Asha V, Professor & Head, Dept of MCA, NHCE, Bengaluru</li>
              </ul>
            </details>
          </div>

          {/* Technical Programme Committee Section */}
          <div className="text-gray-400 lg:text-2xl ml-20 pt-10 font-bold font-mono">
            TECHNICAL PROGRAMME COMMITTEE
            
          </div>

          <div className="flex flex-col items-center ml-20 p-4">
            <details className="w-full text-orange-300 font-bold shadow-md rounded-lg p-4 mt-4">
              <summary className="cursor-pointer text-lg font-bold">TECHNICAL PROGRAMME COMMITTEE</summary>
              <ul className="mt-2 space-y-2 text-white font-medium">
              <li>Dr. A B Madhu Mohana Raju, Professor, Dept of AS, Bengaluru</li>
              <li>Dr. B Nithya Ramesh, Professor, Dept of MCA, Bengaluru</li>
              <li>Dr. Gurulakshmi A B , Professor, Dept of ECE, NHCE, Bengaluru</li>
              <li>Dr. Joshua Daniel Raj J, Professor, Dept of CSE(DS), Bengaluru</li>
              <li>Dr. Kavitha T, Professor, Dept of CSE, NHCE, Bengaluru</li>
              <li>Dr. K Gopal, Professor, Dept of ME, NHCE, Bengaluru</li>
              <li>Dr. M S Raghu, Professor, Dept of R&D, NHCE, Bengaluru</li>
              <li>Dr. Mausri Bhuyan, Professor, Dept of EEE, NHCE, Bengaluru</li>
              <li>Dr. Priyameet Kaur, Professor, Dept of MBA, Bengaluru</li>
              <li>Dr. Rajesh G, Professor, Dept of ECE, NHCE, Bengaluru</li>
              <li>Dr. Ramachandra Naik, Professor, Dept of R&D, NHCE, Bengaluru</li>
              <li>Dr. Santhosh Krishna BV, Professor, Dept of CSE, NHCE, Bengaluru</li>
              <li>Dr. Siva Ramakrishnan S, Professor, Dept of ISE, NHCE, Bengaluru</li>
              <li>Mr. Syam Dev R S, Professor, Dept of AIML, NHCE, Bengaluru</li>
              <li>Dr. Vinoth Kumar K, Professor and Associate Head - R&D, Dept of EEE, NHCE, Bengaluru</li>

              </ul>
            </details>
          </div>
        </div>

        {/* Right Section - Important Dates */}
        <div className="w-1/3 ml-8 pt-32">
          <div className="text-3xl font-bold text-red-500 mt-8">Important Dates</div>
          <div className="p-6 rounded-lg mt-6 shadow-lg w-full max-w-md bg-slate-700">
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
    </>
  );
};

export default Page;
