import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";

const words = ["Change","Enthusiasm","Inquisitiveness","Curiosity","Advancement","Enhancement","Developement"]
export default function LandingPage() {
  return (
    <>
      <div className="lg:ml-20 ml-10 py-10 flex flex-col gap-7">
        <div className="text-orange-600 lg:text-2xl font-semibold font-mono ">
          Technical Papers on Advanced Wireless Communication,<br />Power and AI for Smart City<br />
          <br/><div className="font-bold text-orange-400">*SCOPUS INDEX PUBLICATIONS*</div>
        </div>
        <div className="lg:text-9xl font-bold mb-8 text-5xl">
          Celebrating<br/>
          the Champions<br/>
          of <FlipWords  words={words}/>
        </div>
        
        <div className="bg-white rounded-full w-80 h-14">
          <Link href="/submission">
            <Button className="ml-60  bg-yellow-400 hover:bg-yellow-600 rounded-full w-28 h-14  sm:mr-7 font-bold text-xl">
              Submit
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-row gap-3 items-center">
          <div className="w-4 h-4 bg-orange-500"></div>
          <div className="text-green-700 lg:text-2xl font-bold  ">
            March 7th & 8th | 10:00 AM - 02:30 PM IST
          </div>
        </div>
        
        <div className="text-pink-500 lg:text-2xl font-bold font-mono ">
          <div className="text-red-600 lg:text-2xl font-bold font-mono">Note: </div> The Scopus index book proceeding will include<br/>all accepted papers.
        </div>
      </div>
    </>
  );
}
