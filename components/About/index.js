import Card from "@/components/About/Card";
import PromptList from "@/components/Prompt/PromptList";
import Ring from "@/components/About/Ring.js";

export default function About() {
  return (
    <>
    
      <div id="about" className="relative px-40 min-h-screen">
      {/* <div className="absolute inset-0 z-0 left-[5%]">
          <Ring />
        </div> */}
        <div className="relative grid grid-cols-3 gap-20 pb-36 z-10">
          <h1 className="text-3xl font-semibold">About ChatITP</h1>
          <div className="grid grid-row-2 gap-16">
            <Card />
            <Card />
          </div>
          <div className="grid grid-row-2 gap-16">
            <Card />
            <Card />
          </div>
        </div>
      </div>
      <div id="prompt">
        <PromptList />
      </div>
    </>
  );
}

