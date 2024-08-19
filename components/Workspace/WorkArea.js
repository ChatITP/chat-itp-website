import DraggableWrapper from "./DraggableWrapper";
import Block from "./Block";
import { useState, useRef } from "react";

const testPhrases = [
  "How does",
  "ITP projects",
  "integrate physical computing elements",
  "with web technologies",
  "in the context of",
  "accessible design?",
];

const WorkArea = () => {
  const [blockList, setBlockList] = useState([]);
  const zCounterRef = useRef(0);

  const handleDoubleClick = (event) => {
    setBlockList([
      ...blockList,
      {
        phrases: [],
        x: event.clientX,
        y: event.clientY,
        z: zCounterRef.current++,
      },
    ]);
  };

  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 overflow-hidden"
      onDoubleClick={handleDoubleClick}
    >
      {blockList.map((block, index) => (
        <DraggableWrapper key={index} defaultX={block.x} defaultY={block.y} defaultZ={block.z}>
          <Block initialPromptPhrases={block.phrases} />
        </DraggableWrapper>
      ))}
    </div>
  );
};

export default WorkArea;
