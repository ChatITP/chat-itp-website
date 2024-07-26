import React, { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList";
import LoadingDots from "./LoadingDots";
import request from "/app/lib/request";
import Image from "next/image";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

const ChatWindow = ({ initialMessage }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatListRef = useRef(null);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [position, setPosition] = useState({ x:0, y:0});

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "chat-window",
  });

  useEffect(() => {
    if (transform) {
      setPosition({ x: transform.x, y: transform.y });
    }
  }, [transform]);

  const handleDragEnd = (event) => {
    if (onDragEnd) {
      onDragEnd(event);
    }
  };
  const removeDuplicates = (messages) => {
    const seen = new Set();
    return messages.filter((message) => {
      const isDuplicate = seen.has(message.text);
      seen.add(message.text);
      return !isDuplicate;
    });
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

  const handleClick = (e) => {
    e.stopPropagation();
    setIsSelected((prev) => !prev);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        ref={setNodeRef}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
        {...attributes}
        {...listeners}
        onClick={handleClick}
        className={`flex flex-col h-[324px] w-[669px] ${
          showInput ? "h-[444px]" : "h-[324px]"
        } bg-gray/30 rounded-2xl border-[3px] shadow-md ${
          isSelected ? "border-lightBlue" : "border-none"
        }`}
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
                onClick={handleRegenerate}
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
                onClick={handleAskFollowup}
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
        <div className=" bg-gray/40">
          {showInput && (
            <div className="flex h-[120px]  items-center mb-2 mx-4">
              <input
                type="text"
                value={currentMessage}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="text-white bg-gray/0 flex-1 p-2  rounded-md"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendButtonClick}
                className="ml-2 p-2 bg-blue text-white rounded-md"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default ChatWindow;
