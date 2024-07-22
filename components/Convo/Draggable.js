import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const Draggable = ({ id, children, isDropped, data }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id,
    data,
  });

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    transition,
    display: isDropped ? 'none' : 'block',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="z-50">
      {children}
    </div>
  );
};

export default Draggable;

// import React from 'react';
// import { useDraggable } from '@dnd-kit/core';

// const Draggable = ({ id, children, isDropped, data }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
//     id,
//     data,
//   });

//   const style = {
//     transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
//     transition,
//     display: isDropped ? 'none' : 'block',
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="z-50">
//       {children}
//     </div>
//   );
// };

// export default Draggable;

