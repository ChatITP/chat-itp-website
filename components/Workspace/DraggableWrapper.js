import { useRef, useState } from "react";
import { blockListState, getHighestZ } from "@/contexts/workspace";
import { useSetRecoilState } from "recoil";

/**
 * DraggableWrapper component allows its children to be draggable within the workspace.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the draggable wrapper.
 * @param {number} props.x - The initial x-coordinate position of the draggable element.
 * @param {number} props.y - The initial y-coordinate position of the draggable element.
 * @param {string} props.id - The unique identifier of the draggable element.
 *
 * @example
 * <DraggableWrapper x={100} y={200}>
 *   <YourComponent />
 * </DraggableWrapper>
 */
const DraggableWrapper = ({ children, block, viewport }) => {
  const setBlockList = useSetRecoilState(blockListState);
  const offsetRef = useRef({ x: 0, y: 0 });

  const { x, y, z, id, dragFlag } = block;
  const vx = viewport.x;
  const vy = viewport.y;
  const scale = viewport.scale;
  /**
   * Handles the mouse down event on the draggable element.
   * Stores the click position relative to the draggable element.
   * Adds event listeners to handle dragging and mouse release.
   * @param {MouseEvent} event - The mouse event triggered on mouse down.
   */
  const onMouseDown = (event) => {
    event.stopPropagation();
    // Store the click position relative to the draggable element.
    // With the offset, we can calculate the new position during dragging.
    const xOff = event.clientX - x + vx;
    const yOff = event.clientY - y + vy;
    offsetRef.current = { x: xOff, y: yOff };
    // Add listeners to window to ensure they catch events even if mouse leaves the component
    window.addEventListener("mousemove", onMouseDrag);
    window.addEventListener("mouseup", onMouseUp);

    // Update the z-index of the block to be the highest in the workspace
    setBlockList((blockList) =>
      blockList.map((block) => {
        if (block.id === id) {
          return { ...block, z: getHighestZ(blockList) + 1 };
        }
        return block;
      })
    );
  };

  /**
   * Handles the mouse drag event to update the location of a draggable element.
   * Called when the mouse is moved while mouse is down.
   * @param {MouseEvent} event - The mouse event triggered during dragging.
   */
  const onMouseDrag = (event) => {
    // Calculate the new location of the draggable element based on the mouse movement.
    const newX = event.clientX - offsetRef.current.x + vx;
    const newY = event.clientY - offsetRef.current.y + vy;

    setBlockList((blockList) =>
      blockList.map((block) => {
        if (block.id === id) {
          return { ...block, x: newX, y: newY };
        }
        return block;
      })
    );
  };

  /**
   * Handles the mouse up event to clean up event listeners when dragging ends.
   * Removes event listeners that handled dragging and mouse release.
   */
  const onMouseUp = () => {
    // Clean up listeners when drag ends
    window.removeEventListener("mousemove", onMouseDrag);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // If the dragFlag is true, manually set the offset to 20, 20 and simulate a mouse down event
  // This is for creating a new block from dragging an example card
  if (dragFlag) {
    offsetRef.current = { x: 20, y: 20 };
    // Add listeners to window to ensure they catch events even if mouse leaves the component
    window.addEventListener("mousemove", onMouseDrag);
    window.addEventListener("mouseup", onMouseUp);

    // Set the dragFlag to false after the block is created
    setBlockList((blockList) =>
      blockList.map((block) => {
        if (block.id === id) {
          return { ...block, dragFlag: false };
        }
        return block;
      })
    );
  }

  return (
    <div
      onMouseDown={onMouseDown}
      className="absolute"
      style={{
        transform: `translate(${x - vx}px, ${y - vy}px) scale(${scale})`,
        zIndex: z,
      }}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
