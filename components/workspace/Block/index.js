import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import LoadingDots from "../LoadingDots";
import Association from "./Association";

export const Message = ({ text, sender }) => {
  const messageStyles =
    sender === "user" ? "bg-purple text-black self-end" : "bg-neutral-100 text-black self-start";

  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "text-center"} mb-2`}>
      <div className={`p-3 rounded-lg max-w-lg ${messageStyles}`}>
        <span>{text}</span>
      </div>
    </div>
  );
};

const ChatList = ({ messages, showMessage, toggleShowMessage, isLoading, onSendMessage }) => {
  const userMessagesRef = useRef(null);
  const inputRef = useRef(null);
  const [showInput, setShowInput] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (userMessagesRef.current) {
      userMessagesRef.current.scrollTop = userMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleRegenerate = () => {
    const lastUserMessage = [...messages].reverse().find((message) => message.sender === "user");
    if (lastUserMessage) {
      onSendMessage(lastUserMessage.text);
    }
  };

  const handleAskFollowup = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendButtonClick = () => {
    if (currentMessage.trim() !== "") {
      onSendMessage(currentMessage);
      setCurrentMessage("");
      setShowInput(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && currentMessage.trim() !== "") {
      onSendMessage(currentMessage);
      setCurrentMessage("");
      setShowInput(false);
    }
  };

  const userMessages = messages.filter((message) => message.sender === "user");
  const otherMessages = messages.filter((message) => message.sender !== "user");

  return (
    <div className="chat-list flex flex-col h-full">
      <div
        className={`user-messages bg-gray text-white/80 pt-3 px-5 ${
          showMessage ? "rounded-t-2xl" : "rounded-2xl"
        } overflow-auto text-sm`}
        ref={userMessagesRef}
      >
        <Association />
        <div className="flex justify-end text-xs gap-2">
          {!isLoading && (
            <>
              <button onClick={toggleShowMessage} className="font-sans text-[10px]">
                {showMessage ? "Hide" : "Expand"}
              </button>
              {!showMessage && <Image src="/expand.svg" alt="hide icon" width={9} height={9} />}
              {showMessage && <Image src="/hide.svg" alt="hide icon" width={9} height={9} />}
            </>
          )}
        </div>
      </div>
      {showMessage && (
        <div className="other-messages bg-chatGray flex-1 overflow-auto p-2 rounded-2xl text-white/75 z-50 flex flex-col justify-between">
          <div className="w-[430px] h-[109px] mx-auto overflow-y-auto scrollbar-thumb-white">
            {otherMessages.map((message, index) => (
              <div key={index} className="my-2 rounded-md text-white text-sm font-sans">
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center space-y-2">
            {isLoading && (
              <div className="flex justify-center items-center my-2 flex-1">
                <LoadingDots />
              </div>
            )}
            {!isLoading && (
              <div className="flex justify-end space-x-4 mb-2 w-full">
                <div className="flex flex-row">
                  <button
                    onClick={handleRegenerate}
                    className="p-2 text-[10px] font-semibold text-white rounded-md"
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
                    className="p-2 text-[10px] font-semibold text-white rounded-md"
                  >
                    Ask followup
                  </button>
                  <Image
                    src="/tasks.svg"
                    alt="tasks icon"
                    width={12}
                    height={12}
                    className="my-auto mr-4"
                  />
                </div>
              </div>
            )}
            {showInput && (
              <div className="flex h-[120px] items-center mb-2 mx-4">
                <input
                  type="text"
                  ref={inputRef}
                  value={currentMessage}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  className="text-white bg-gray-700 flex-1 p-2 rounded-md"
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
      )}
    </div>
  );
};

export default ChatList;
