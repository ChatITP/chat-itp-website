import DraggableWrapper from "./DraggableWrapper";
import { useRef, useEffect } from "react";
import Block from "./Block";
import { useRecoilState } from "recoil";
import { blockListState, viewportPositionState } from "../../contexts/workspace";

const WorkArea = () => {
  const [blockList, setBlockList] = useRecoilState(blockListState);
  const [viewportPosition, setViewportPosition] = useRecoilState(viewportPositionState);
  const prevPos = useRef({ x: 0, y: 0 });

  // Disables default pinch zooming on track pads
  useEffect(() => {
    const noPinchZoom = (event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", noPinchZoom, { passive: false });
    return () => {
      window.removeEventListener("wheel", noPinchZoom);
    };
  });

  const onWheel = (event) => {
    event.preventDefault();
    if (event.ctrlKey) {
      const dScale = event.deltaY * -0.01;
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
    } else {
      // Track pad panning
      const dx = event.deltaX;
      const dy = event.deltaY;

      setViewportPosition((prev) => {
        return {
          x: prev.x + dx / prev.scale,
          y: prev.y + dy / prev.scale,
          scale: prev.scale,
        };
      });
    }
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
        x: prev.x - dx / prev.scale,
        y: prev.y - dy / prev.scale,
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
      className="absolute w-screen h-screen top-0 left-0 overflow-hidden -z-10"
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
