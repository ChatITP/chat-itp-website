import DraggableWrapper from "./DraggableWrapper";
import Block from "./Block";

const testPhrases = [
  "How does",
  "ITP projects",
  "integrate physical computing elements",
  "with web technologies",
  "in the context of",
  "accessible design?",
];

const WorkArea = () => {
  return (
    <div className="absolute w-screen h-screen top-0 left-0 overflow-hidden">
      <DraggableWrapper>
        <Block initialPromptPhrases={testPhrases} />
      </DraggableWrapper>
    </div>
  );
};

export default WorkArea;
