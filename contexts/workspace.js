import { atom } from "recoil";

const blockListState = atom({
  key: "blockList",
  default: [],
});

export { blockListState };
