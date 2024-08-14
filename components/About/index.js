import Card from "@/components/About/Card";

import Ring from "@/components/About/Ring";
import { FaCompass } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import Blob from "@/components/About/Blob";

export default function About() {
  return (
    <>
      <div className="min-h-[640px] max-w-[1440px] m-auto">
        <Blob />
        <Ring />
        <div className="relative h-full">
          <h1 className="absolute text-4xl font-semibold lg:left-[96px] top-[80px] left-[calc(50%-202px)]">
            About ChatITP
          </h1>
          <div className="m-auto lg:m-0 pt-40 w-fit grid md:grid-cols-2 md:grid-rows-none grid-rows-2 gird-cols-none gap-10 relative lg:mr-24 lg:ml-auto">
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
    </>
  );
}
