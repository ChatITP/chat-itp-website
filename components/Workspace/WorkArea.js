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
    const dScale = event.deltaY * 0.001;
    const newScale = Math.max(0.1, Math.min(2, viewportPosition.scale + dScale));

    let canvasMouseX = event.clientX / viewportPosition.scale + viewportPosition.x;
    let canvasMouseY = event.clientY / viewportPosition.scale + viewportPosition.y;

    let newVX = canvasMouseX - event.clientX / newScale;
    let newVY = canvasMouseY - event.clientY / newScale;

    setViewportPosition(() => {
      return {
        x: newVX,
        y: newVY,
        scale: newScale,
      };
    });
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

  console.log(viewportPosition);

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseDrag);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 overflow-hidden bg-gray2 -z-10"
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
