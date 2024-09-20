import { useRef, useState } from "react";
import { blockListState } from "@/contexts/workspace";
import { useSetRecoilState } from "recoil";

/**
 * DraggableWrapper component allows its children to be draggable within the workspace.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the draggable wrapper.
 * @param {number} props.x - The initial x-coordinate position of the draggable element.
 * @param {number} props.y - The initial y-coordinate position of the draggable element.
 * @param {string} props.itemId - The unique identifier of the draggable element.
 *
 * @example
 * <DraggableWrapper x={100} y={200}>
 *   <YourComponent />
 * </DraggableWrapper>
 */
const DraggableWrapper = ({ children, x, y, itemId }) => {
  const setBlockList = useSetRecoilState(blockListState);
  const offsetRef = useRef({ x: 0, y: 0 });

  const [location, setLocation] = useState({ x, y });

  /**
   * Handles the mouse down event on the draggable element.
   * Stores the click position relative to the draggable element.
   * Adds event listeners to handle dragging and mouse release.
   * @param {MouseEvent} event - The mouse event triggered on mouse down.
   */
  const onMouseDown = (event) => {
    // Store the click position relative to the draggable element.
    // With the offset, we can calculate the new position during dragging.
    const xOff = event.clientX - location.x;
    const yOff = event.clientY - location.y;
    offsetRef.current = { x: xOff, y: yOff };
    // Add listeners to window to ensure they catch events even if mouse leaves the component
    window.addEventListener("mousemove", onMouseDrag);
    window.addEventListener("mouseup", onMouseUp);
  };

  /**
   * Handles the mouse drag event to update the location of a draggable element.
   * Called when the mouse is moved while mouse is down.
   * @param {MouseEvent} event - The mouse event triggered during dragging.
   */
  const onMouseDrag = (event) => {
    // Calculate the new location of the draggable element based on the mouse movement.
    const newX = event.clientX - offsetRef.current.x;
    const newY = event.clientY - offsetRef.current.y;
    setLocation({ x: newX, y: newY });
  };

  /**
   * Handles the mouse up event to clean up event listeners when dragging ends.
   * Removes event listeners that handled dragging and mouse release.
   */
  const onMouseUp = () => {
    // Clean up listeners when drag ends
    window.removeEventListener("mousemove", onMouseDrag);
    window.removeEventListener("mouseup", onMouseUp);

    // Update the blockList with the new location of the draggable element
    setBlockList((blockList) =>
      blockList.map((block) => {
        if (block.itemId === itemId) {
          return { ...block, x: location.x, y: location.y };
        }
        return block;
      })
    );
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className="absolute"
      style={{
        transform: `translate(${location.x}px, ${location.y}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
