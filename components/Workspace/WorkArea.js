import DraggableWrapper from "./DraggableWrapper";
import { useRef } from "react";
import Block from "./Block";
import { useRecoilState } from "recoil";
import { blockListState, viewportPositionState } from "../../contexts/workspace";

const WorkArea = () => {
  const [blockList, setBlockList] = useRecoilState(blockListState);
  const [viewportPosition, setViewportPosition] = useRecoilState(viewportPositionState);
  const prevPos = useRef({ x: 0, y: 0 });

  const onWheel = (event) => {
    /* const dScale = event.deltaY * 0.001;
    const newScale = viewportPosition.scale + dScale;

    if (newScale < 0.1 || newScale > 2) {
      return;
    }

    const vw = window.innerWidth / viewportPosition.scale;
    const vh = window.innerHeight / viewportPosition.scale;

    const newVw = window.innerWidth / newScale;
    const newVh = window.innerHeight / newScale;

    const dx = (newVw - vw) / 2;
    const dy = (newVh - vh) / 2;

    setViewportPosition((prev) => {
      return {
        x: prev.x - dx,
        y: prev.y - dy,
        scale: newScale,
      };
    }); */
  };

  const onMouseDown = (event) => {
    prevPos.current = { x: event.clientX, y: event.clientY };
    window.addEventListener("mousemove", onMouseDrag);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseDrag = (event) => {
    const dx = event.clientX - prevPos.current.x;
    const dy = event.clientY - prevPos.current.y;

    prevPos.current = { x: event.clientX, y: event.clientY };

    setViewportPosition((prev) => {
      return {
        x: prev.x - dx,
        y: prev.y - dy,
        scale: prev.scale,
      };
    });
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseDrag);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 overflow-hidden"
      onMouseDown={onMouseDown}
      onWheel={onWheel}
    >
      {blockList.map((block) => (
        <DraggableWrapper block={block} viewport={viewportPosition}>
          {block.type === "block" && <Block initialPromptPhrases={block.phrases} id={block.id} />}
        </DraggableWrapper>
      ))}
    </div>
  );
};

export default WorkArea;
