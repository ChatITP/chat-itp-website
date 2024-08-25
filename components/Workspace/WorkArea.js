import DraggableWrapper from "./DraggableWrapper";
import Block from "./Block";
import { useRecoilState } from "recoil";
import { blockListState } from "../../contexts/workspace";

const WorkArea = () => {
  const [blockList, setBlockList] = useRecoilState(blockListState);

  const getHighestZ = () => {
    return blockList.reduce((max, block) => (block.z > max ? block.z : max), 0);
  };

  const handleDoubleClick = (event) => {
    setBlockList([
      ...blockList,
      {
        phrases: [],
        x: event.clientX,
        y: event.clientY,
        z: getHighestZ() + 1,
      },
    ]);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 overflow-hidden"
      onDoubleClick={handleDoubleClick}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
    >
      {blockList.map((block, index) => (
        <DraggableWrapper key={index} defaultX={block.x} defaultY={block.y} defaultZ={block.z}>
          <Block initialPromptPhrases={block.phrases} id={index} />
        </DraggableWrapper>
      ))}
    </div>
  );
};

export default WorkArea;
