import DraggableWrapper from "./DraggableWrapper";
import Block from "./Block";
import { useRecoilState } from "recoil";
import { blockListState, createBlock, getHighestZ } from "../../contexts/workspace";

const WorkArea = () => {
  const [blockList, setBlockList] = useRecoilState(blockListState);

  console.log(blockList);
  return (
    <div className="absolute w-screen h-screen top-0 left-0 overflow-hidden">
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
