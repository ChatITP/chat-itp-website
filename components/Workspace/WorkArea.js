import { useDroppable } from "@dnd-kit/core";
import DraggableWrapper from "./DraggableWrapper";
import Block from "./Block";

const WorkArea = () => {
  return (
    <div className="absolute w-screen h-screen top-0 left-0 overflow-hidden">
      <DraggableWrapper>
        <Block />
      </DraggableWrapper>
    </div>
  );
};

export default WorkArea;
