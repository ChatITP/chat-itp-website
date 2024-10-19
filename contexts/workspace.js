import { atom } from "recoil";
import uniqid from "uniqid";

const blockListState = atom({
  key: "blockList",
  default: [],
});

const backgroundPositionState = atom({
  key: "backgroundPosition",
  default: { x: 0, y: 0 },
});

const viewportPositionState = atom({
  key: "viewportPosition",
  default: { x: 0, y: 0, scale: 1 },
});

function createBlock(type = "block", x = 0, y = 0, z = 0, phrases = [], dragFlag = false) {
  return {
    x,
    y,
    z,
    id: uniqid(),
    type,
    phrases,
    dragFlag,
  };
}

function getHighestZ(blockList) {
  return blockList.reduce((max, block) => (block.z > max ? block.z : max), 0);
}

export { createBlock, getHighestZ, blockListState, backgroundPositionState, viewportPositionState };
