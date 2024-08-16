import React, { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList";
import request from "/app/lib/request";
import { useDrag } from "react-dnd";

const ItemType = {
  CHAT_WINDOW: "chatWindow",
};

const ChatWindow = ({ initialMessage, initialPosition }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatListRef = useRef(null);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(true);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);
  const initialMousePosition = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const clickStartPosition = useRef({ x: 0, y: 0 });

  const DRAG_THRESHOLD = 5;

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemType.CHAT_WINDOW,
    item: { id: "chat-window" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isDraggingEnabled,
  }));

  const handleMouseDown = (e) => {
    if (!isDraggingEnabled) return;
    e.preventDefault();
    isDraggingRef.current = false;
    clickStartPosition.current = { x: e.clientX, y: e.clientY };
    initialMousePosition.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - clickStartPosition.current.x;
      const dy = e.clientY - clickStartPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > DRAG_THRESHOLD) {
        isDraggingRef.current = true;
        setPosition({
          x: e.clientX - initialMousePosition.current.x,
          y: e.clientY - initialMousePosition.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) {
        handleClick();
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  const handleSendMessage = async (message) => {
    let newMessages = [...messages, { text: message, sender: "user" }];
    newMessages = removeDuplicates(newMessages);
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await request(
        "POST",
        process.env.NEXT_PUBLIC_API_URL + "/llm/generate",
        {
          userPrompt: message,
        }
      );

      newMessages = [
        ...newMessages,
        { text: response.data.content, sender: "ai" },
      ];
      newMessages = removeDuplicates(newMessages);
      setMessages(newMessages);
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      newMessages = [
        ...newMessages,
        { text: "Failed to get a response from the model.", sender: "ai" },
      ];
      newMessages = removeDuplicates(newMessages);
      setMessages(newMessages);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialMessage && !hasSentInitialMessage) {
      handleSendMessage(initialMessage);
      setHasSentInitialMessage(true);
    }
  }, [initialMessage, hasSentInitialMessage]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const removeDuplicates = (messages) => {
    const seen = new Set();
    return messages.filter((message) => {
      const isDuplicate = seen.has(message.text);
      seen.add(message.text);
      return !isDuplicate;
    });
  };

  const toggleShowMessage = () => {
    setShowMessage((prev) => !prev);
  };

  const handleFocus = () => {
    setIsDraggingEnabled(false);
  };

  const handleBlur = () => {
    setIsDraggingEnabled(true);
  };

  return (
    <div
      ref={dragPreview}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      className={`flex flex-col w-[500px]  rounded-2xl border-[3px] shadow-md bg-gray ${
        isSelected ? "border-lightBlue" : "border-none"
      } ${showMessage ? "h-[278px]" : "h-[98px]"}`}
    >
      <div className="flex-1 w-full overflow-y-auto" ref={chatListRef}>
        <ChatList
          messages={messages}
          showMessage={showMessage}
          toggleShowMessage={toggleShowMessage}
          isLoading={loading}
          onSendMessage={handleSendMessage}
          onInputFocus={handleFocus}
          onInputBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
