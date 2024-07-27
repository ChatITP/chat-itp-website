import Card from "@/components/About/Card";
import PromptList from "@/components/Prompt/PromptList";
import Ring from "@/components/About/Ring";
import { FaCompass } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";

export default function About() {
  return (
    <>
      <div id="about" className="min-h-[calc(max(100vh,640px))] max-w-[1440px] m-auto">
        <Ring />
        <div className="relative">
          <h1 className="absolute text-4xl font-semibold left-[96px] top-[50px]">About ChatITP</h1>
          <div className="w-fit grid grid-cols-2 gap-10 absolute right-20">
            <div className="grid grid-row-2 gap-10">
              <Card
                topic="Community Driven"
                des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh ur bibendum cras"
                Icon={FaPeopleGroup}
              />
              <Card
                topic="Open Source"
                des="Lorem ipsum dolor sit amet dipiscing elit. Et nibh urna in proin dui purus bibendum cras"
                Icon={FaCode}
              />
            </div>
            <div className="grid grid-rows-2 gap-10">
              <Card
                topic="Living Data"
                des="or sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus bibendum cras"
                Icon={FaDatabase}
              />
              <Card
                topic="Placeholder"
                des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna in proin dui purus"
                Icon={FaCompass}
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
