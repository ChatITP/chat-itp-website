import React, { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList";
import LoadingDots from "./LoadingDots";
import request from "/app/lib/request";

const ChatWindow = ({ initialMessage }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatListRef = useRef(null);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showInput, setShowInput] = useState(false);

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
    if (messages.length > 0) {
      handleSendMessage("Regenerate: " + messages[messages.length - 1].text);
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
    }
  };

  const handleSendButtonClick = () => {
    if (currentMessage.trim() !== "") {
      handleSendMessage(currentMessage);
      setShowInput(false); // Hide the input after sending the message
    }
  };

  return (
    <div className="flex flex-col h-96 w-[600px] bg-gray2 rounded-lg border-2 border-gray2 shadow-md">
      <div className="flex-1 w-full overflow-y-auto" ref={chatListRef}>
        <ChatList messages={messages} />
      </div>
      {loading && (
        <div className="flex justify-center items-center my-2">
          <LoadingDots />
        </div>
      )}
      <div className="flex justify-end items-center mb-2 space-x-2 mr-2">
        <button
          onClick={handleRegenerate}
          className="p-2 bg-blue text-white rounded-md"
        >
          Regenerate
        </button>
        <button
          onClick={handleAskFollowup}
          className="p-2 bg-blue text-white rounded-md"
        >
          Ask follow-up
        </button>
      </div>
      {showInput && (
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={currentMessage}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="text-black flex-1 p-2 border border-blue rounded-md"
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
  );
};

export default ChatWindow;

