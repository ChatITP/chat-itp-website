import Card from "@/components/About/Card";
import PromptList from "@/components/Prompt/PromptList";

export default function About() {
  return (
    <>
      <div id="about" className="relative px-40 min-h-screen">
        <div className="relative grid grid-cols-3 gap-20 pb-36 z-10">
          <h1 className="text-3xl font-semibold">About ChatITP</h1>
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
          <div className="grid grid-row-2 gap-16">
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
      <div id="prompt">
        <PromptList />
      </div>
    </>
  );
}
