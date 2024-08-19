import { atom } from "recoil";

const tagState = atom({
  key: "tags",
  default: [],
});

const showExamplesState = atom({
  key: "showExamples",
  default: true,
});

export { tagState, showExamplesState };
