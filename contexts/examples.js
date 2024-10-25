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

const exampleState = atom({
  key: "examples",
  default: promptData.map((prompt) => ({
    text: prompt.text,
    phrases: [prompt.text],
  })),
});

export { tagState, showExamplesState, exampleState };
