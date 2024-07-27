import Card from "@/components/About/Card";
import PromptList from "@/components/Prompt/PromptList";
import Ring from "@/components/About/Ring";

export default function About() {
  return (
    <>
      <div id="about" className="min-h-[calc(max(100vh,640px))] max-w-[1440px] m-auto">
        <Ring />
        <div className="relative">
          <h1 className="absolute text-4xl font-semibold left-[96px] top-[50px]">About ChatITP</h1>
          <div className="w-fit grid grid-cols-2 gap-16 absolute right-40">
            <div className="grid grid-row-2 gap-16">
              <Card
                topic="Community Driven"
                des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc."
              />
              <Card
                topic="Open Source"
                des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc."
              />
            </div>
            <div className="grid grid-rows-2 gap-16">
              <Card
                topic="Community Driven"
                des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc."
              />
              <Card
                topic="Community Driven"
                des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras. Morbi cursus nunc."
              />
            </div>
          </div>
        </div>
      </div>
      <div id="prompt">
        <PromptList />
      </div>
    </>
  );
}
