import DraggableWrapper from "./DraggableWrapper";
import { useRef } from "react";
import Block from "./Block";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  blockListState,
  backgroundPositionState,
  createBlock,
  getHighestZ,
} from "../../contexts/workspace";

const WorkArea = () => {
  const [blockList, setBlockList] = useRecoilState(blockListState);
  const setBackgroundPosition = useSetRecoilState(backgroundPositionState);

  const prevPos = useRef({ x: 0, y: 0 });

  const onMouseDown = (event) => {
    prevPos.current = { x: event.clientX, y: event.clientY };
    window.addEventListener("mousemove", onMouseDrag);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseDrag = (event) => {
    const dx = event.clientX - prevPos.current.x;
    const dy = event.clientY - prevPos.current.y;
    prevPos.current = { x: event.clientX, y: event.clientY };
    setBlockList((blockList) =>
      blockList.map((block) => ({ ...block, x: block.x + dx, y: block.y + dy }))
    );
    setBackgroundPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
      scale: prev.scale,
    }));
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseDrag);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 overflow-hidden"
      onMouseDown={onMouseDown}
    >
      {blockList.map((block) => (
        <DraggableWrapper
          key={block.id}
          x={block.x}
          y={block.y}
          z={block.z}
          id={block.id}
          dragFlag={block.dragFlag}
        >
          {block.type === "block" && <Block initialPromptPhrases={block.phrases} id={block.id} />}
        </DraggableWrapper>
      ))}
    </div>
  );
};

export default WorkArea;
