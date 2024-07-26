import React, { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList";
import LoadingDots from "./LoadingDots";
import request from "/app/lib/request";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";

const ItemType = {
  CHAT_WINDOW: "chatWindow",
};

const ChatWindow = ({ initialMessage }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatListRef = useRef(null);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const initialMousePosition = useRef({ x: 0, y: 0 });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CHAT_WINDOW,
    item: { id: "chat-window" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType.CHAT_WINDOW,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      setPosition((prevPosition) => ({
        x: prevPosition.x + delta.x,
        y: prevPosition.y + delta.y,
      }));
    },
  }));

  const handleMouseDown = (e) => {
    initialMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e, actionType) => {
    const threshold = 5;
    const movedX = Math.abs(e.clientX - initialMousePosition.current.x);
    const movedY = Math.abs(e.clientY - initialMousePosition.current.y);

    if (movedX < threshold && movedY < threshold) {
      if (actionType === "regenerate") {
        handleRegenerate();
      } else if (actionType === "askFollowup") {
        handleAskFollowup();
      } else if (actionType === "select") {
        handleClick();
      } else if (actionType === "send") {
        handleSendButtonClick();
      }
    }
  };

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  const handleSendMessage = async (message) => {
    let newMessages = [...messages, { text: message, sender: "user" }];
    newMessages = removeDuplicates(newMessages);
    setMessages(newMessages);
    setLoading(true);
    setCurrentMessage("");

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

  const handleRegenerate = () => {
    setIsSelected(false);
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find((message) => message.sender === "user");

    if (lastUserMessage) {
      handleSendMessage("Regenerate: " + lastUserMessage.text);
    }
  };

  const handleAskFollowup = () => {
    setShowInput(true);
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

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && currentMessage.trim() !== "") {
      handleSendMessage(currentMessage);
      setShowInput(false);
    }
  };

  const handleSendButtonClick = () => {
    if (currentMessage.trim() !== "") {
      handleSendMessage(currentMessage);
      setShowInput(false);
    }
  };

  return (
    <div ref={drag}>
      <div
        ref={(node) => drag(drop(node))}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          opacity: isDragging ? 0.5 : 1,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={(e) => handleMouseUp(e, "select")}
        className={`flex flex-col h-[324px] w-[669px] ${
          showInput ? "h-[444px]" : "h-[324px]"
        } bg-gray/30 rounded-2xl border-[3px] shadow-md ${
          isSelected ? "border-lightBlue" : "border-none"
        } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <div className="flex-1 w-full overflow-y-auto" ref={chatListRef}>
          <ChatList messages={messages} />
        </div>
        {loading && (
          <div className="flex justify-center items-center my-2">
            <LoadingDots />
          </div>
        )}
        {!showInput && (
          <div className="flex justify-end items-center mb-2 space-x-2 mr-10">
            <div className="flex flex-row">
              <button
                onMouseDown={handleMouseDown}
                onMouseUp={(e) => handleMouseUp(e, "regenerate")}
                className="p-2 text-sm font-semibold text-white rounded-md"
              >
                Regenerate
              </button>
              <Image
                src="/switch.svg"
                alt="switch icon"
                width={12}
                height={12}
                className="my-auto"
              />
            </div>

            <div className="flex flex-row">
              <button
                onMouseDown={handleMouseDown}
                onMouseUp={(e) => handleMouseUp(e, "askFollowup")}
                className="p-2 text-sm font-semibold text-white rounded-md"
              >
                Ask followup
              </button>
              <Image
                src="/tasks.svg"
                alt="tasks icon"
                width={12}
                height={12}
                className="my-auto"
              />
            </div>
          </div>
        )}
        <div className="bg-gray/40">
          {showInput && (
            <div className="flex h-[120px] items-center mb-2 mx-4">
              <input
                type="text"
                value={currentMessage}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="text-white bg-gray/0 flex-1 p-2 rounded-md"
                placeholder="Type a message..."
              />
              <button
                onMouseDown={handleMouseDown}
                onMouseUp={(e) => handleMouseUp(e, "send")}
                onClick={handleSendButtonClick}
                className="ml-2 p-2 bg-blue text-white rounded-md"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
