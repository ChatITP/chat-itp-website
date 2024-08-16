import { atom } from "recoil";

const tagState = atom({
  key: "tags",
  default: [],
});

export { tagState };
