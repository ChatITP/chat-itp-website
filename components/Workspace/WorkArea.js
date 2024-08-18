import { useDroppable } from "@dnd-kit/core";

const WorkArea = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: "work-area",
  });

  return <div ref={setNodeRef} className="absolute w-screen h-screen top-0 left-0"></div>;
};

export default WorkArea;
