import { FlipWords } from "@/components/ui/flip-words";

const words = ["Change","Enthusiasm","Curiosity","Advancement"]
export default function LandingPage() {
  return (
    <>
      <div className="ml-20 py-10 flex flex-col gap-6">
        <div className="text-orange-700 lg:text-2xl font-bold font-mono ">
          NHCE Conference 24 | Banglore, Karnataka
        </div>
        <div className="lg:text-9xl font-bold mb-8 sm:text-7xl">
          Celebrating<br/>
          the Champions<br/>
          of <FlipWords  words={words}/>
        </div>
        
        <div>
          submit button
        </div>
        <div>
          date
        </div>
        <div>
          footer
        </div>
      </div>
    </>
  );
}
