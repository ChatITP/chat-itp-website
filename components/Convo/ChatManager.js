// ChatManager.js
import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ChatWindow from "./ChatWindow";

export const ItemType = {
    PHRASE: "phrase",
    CHAT_WINDOW: "chatWindow",
  };


const ChatManager = ({ phrases }) => {
  const [chatWindows, setChatWindows] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const addChatWindow = (initialMessage) => {
    const newChatWindow = {
      id: Date.now(),
      initialMessage,
    };
    setChatWindows((prev) => [...prev, newChatWindow]);
  };

  const removeChatWindow = (id) => {
    setChatWindows((prev) => prev.filter((chat) => chat.id !== id));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && selectedChatId !== null) {
        removeChatWindow(selectedChatId);
        setSelectedChatId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedChatId]);

  const [{ isOver }, drop] = useDrop({
    accept: ItemType.PHRASE,
    drop: (item) => setClickedItem(item.phrase),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    if (clickedItem) {
      addChatWindow(clickedItem);
      setClickedItem(null);
    }
  }, [clickedItem]);

  return (
    <div ref={drop} className={`dropzone ${isOver ? "hovered" : ""}`}>
      {chatWindows.map((chatWindow) => (
        <ChatWindow
          key={chatWindow.id}
          initialMessage={chatWindow.initialMessage}
          onSelect={() => setSelectedChatId(chatWindow.id)}
          isSelected={selectedChatId === chatWindow.id}
        />
      ))}
    </div>
  );
};

export default ChatManager;

// import React, { useState, useEffect } from "react";
// import ChatWindow from "./ChatWindow";
// import { useDrag, useDrop } from "react-dnd";

// export const ItemType = {
//     PHRASE: "phrase",
//     CHAT_WINDOW: "chatWindow",
//   };

// const ChatManager = ({ phrases }) => {
//     const [chatWindows, setChatWindows] = useState([]);
//     const [selectedChatId, setSelectedChatId] = useState(null);
//     const [clickedItem, setClickedItem] = useState(null);
  
//     const addChatWindow = (initialMessage) => {
//       const newChatWindow = {
//         id: Date.now(), 
//         initialMessage,
//       };
//       setChatWindows((prev) => [...prev, newChatWindow]);
//     };
  
//     const removeChatWindow = (id) => {
//       setChatWindows((prev) => prev.filter((chat) => chat.id !== id));
//     };
  
//     useEffect(() => {
//       const handleKeyDown = (e) => {
//         if (e.key === "Delete" && selectedChatId !== null) {
//           removeChatWindow(selectedChatId);
//           setSelectedChatId(null);
//         }
//       };
  
//       window.addEventListener("keydown", handleKeyDown);
//       return () => {
//         window.removeEventListener("keydown", handleKeyDown);
//       };
//     }, [selectedChatId]);
  
//     const [{ isOver }, drop] = useDrop({
//       accept: ItemType.PHRASE,
//       drop: (item) => setClickedItem(item.phrase),
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//       }),
//     });
  
//     useEffect(() => {
//       if (clickedItem) {
//         addChatWindow(clickedItem);
//         setClickedItem(null);
//       }
//     }, [clickedItem]);
  
//     return (
//       <div ref={drop} className={`dropzone ${isOver ? "hovered" : ""}`}>
//         {chatWindows.map((chatWindow) => (
//           <ChatWindow
//             key={chatWindow.id}
//             initialMessage={chatWindow.initialMessage}
//             onSelect={() => setSelectedChatId(chatWindow.id)}
//             isSelected={selectedChatId === chatWindow.id}
//           />
//         ))}
//       </div>
//     );
//   };

// export default ChatManager;