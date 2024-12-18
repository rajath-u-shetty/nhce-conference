import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";

const words = ["Change", "Enthusiasm", "Inquisitiveness", "Curiosity", "Advancement", "Enhancement", "Development"];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full px-4 lg:px-20 py-6 flex flex-col gap-4">
        <div className="text-orange-600 text-2xl lg:text-4xl font-semibold font-mono">
          Technical Papers on Advanced Wireless Communication,
          Power and AI for Smart City
          
          <div className="font-bold text-orange-400 text-xl lg:text-2xl mt-4">
            SCOPUS INDEX PUBLICATIONS
          </div>
        </div>

        <div className="text-white font-bold text-4xl lg:text-9xl mt-4">
          Celebrating
          the Champions
          of <FlipWords words={words} />
        </div>
        
        <div className="relative w-full max-w-xs mt-6">
          <div className="bg-white rounded-full h-14 w-full">
            <Link href="/submission">
              <Button className="absolute right-0 bg-yellow-400 hover:bg-yellow-600 rounded-full w-28 h-14 font-bold text-xl">
                Submit
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-6">
          <div className="w-4 h-4 bg-orange-500"></div>
          <div className="text-green-500 text-lg lg:text-2xl font-bold">
            March 7th & 8th | 2025
          </div>
        </div>
        
        <div className="text-pink-200 text-lg lg:text-2xl font-bold font-mono mt-4">
          <div className="text-red-600">Note: </div>
          The Scopus index book proceeding will include
          all accepted papers.
        </div>
      </div>
    </div>
  );
}
