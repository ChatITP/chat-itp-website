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

    // Convert mouse position to canvas space considering zoom and viewport offset
    const mouseCanvasX = event.clientX / scale + vx;
    const mouseCanvasY = event.clientY / scale + vy;

    // Store the click position relative to the draggable element
    const xOff = mouseCanvasX - x;
    const yOff = mouseCanvasY - y;

    offsetRef.current = { x: xOff, y: yOff };

    // Add listeners to window to handle dragging and releasing
    window.addEventListener("mousemove", onMouseDrag);
    window.addEventListener("mouseup", onMouseUp);

    // Update the z-index to bring the dragged block to the front
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
   * Called when the mouse is moved while the mouse is down.
   * @param {MouseEvent} event - The mouse event triggered during dragging.
   */
  const onMouseDrag = (event) => {
    // Convert the current mouse position to canvas space
    const mouseCanvasX = event.clientX / scale + vx;
    const mouseCanvasY = event.clientY / scale + vy;

    // Calculate the new position of the draggable element in canvas space
    const newX = mouseCanvasX - offsetRef.current.x;
    const newY = mouseCanvasY - offsetRef.current.y;

    // Update the block's position in the blockList
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
      className="absolute transform"
      style={{
        transform: `translate(${(x - vx) * scale}px, ${(y - vy) * scale}px) scale(${scale})`,
        zIndex: z,
        transformOrigin: "top left",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
