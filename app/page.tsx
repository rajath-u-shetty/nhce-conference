import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { Ghost } from "lucide-react";
import Link from "next/link";

const words = ["Change","Enthusiasm","Curiosity","Advancement"]
export default function LandingPage() {
  return (
    <>
      <div className="ml-20 py-10 flex flex-col gap-7">
        <div className="text-orange-700 lg:text-2xl font-bold font-mono ">
          NHCE Conference 24 | Banglore, Karnataka
        </div>
        <div className="lg:text-9xl font-bold mb-8 sm:text-7xl">
          Celebrating<br/>
          the Champions<br/>
          of <FlipWords  words={words}/>
        </div>
        
        <div className="bg-white rounded-full w-80 h-14">
          <Link href="/sign-in">
            <Button className="ml-60 bg-yellow-400 hover:bg-red-600 rounded-full w-28 h-14 font-bold text-xl">
              Submit
            </Button>
          </Link>
        </div>
        <br/>
        <div className="flex flex-row gap-3 items-center">
          <div className="w-4 h-4 bg-orange-500"></div>
          <div className="text-green-700 lg:text-2xl font-bold  ">
            Feburary 30th | 10:00 AM - 02:30 PM IST
          </div>
        </div>
        
        <div className="text-pink-500 lg:text-2xl font-bold font-mono ">
          <div className="text-red-600 lg:text-2xl font-bold font-mono">Note: </div> Accepting papers for forever
        </div>
      </div>
    </>
  );
}
