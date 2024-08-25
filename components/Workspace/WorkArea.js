import DraggableWrapper from "./DraggableWrapper";
import Block from "./Block";
import { useRecoilState } from "recoil";
import { blockListState } from "../../contexts/workspace";
import NewBlock from "./NewBlock";

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
        type: "new-block",
      },
    ]);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };
  console.log(blockList);
  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 overflow-hidden"
      onDoubleClick={handleDoubleClick}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
    >
      {blockList.map((block, index) => (
        <DraggableWrapper key={index} x={block.x} y={block.y} z={block.z} id={index}>
          {block.type === "block" && <Block initialPromptPhrases={block.phrases} id={index} />}
          {block.type === "new-block" && <NewBlock id={index} />}
        </DraggableWrapper>
      ))}
    </div>
  );
};

export default WorkArea;
