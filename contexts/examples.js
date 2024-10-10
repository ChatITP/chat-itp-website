import { atom } from "recoil";

const tagState = atom({
  key: "tags",
  default: [],
});

const showExamplesState = atom({
  key: "showExamples",
  default: true,
});

//import json file
import promptData from "public/prompt_data.json";

// function to shuffle and pick 10 random prompts
const pickRandomPrompts = (prompts, count) => {
  return [...prompts].sort(() => 0.5 - Math.random()).slice(0, count);
};

const exampleState = atom({
  key: "examples",
  default: pickRandomPrompts(promptData, 10).map(prompt => ({
    text: prompt.text,
    phrases: prompt.text.split(/[\s,]+/).map(word => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))
  })),
});

export { tagState, showExamplesState, exampleState };
