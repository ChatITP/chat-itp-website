import React, { useState, useEffect, useRef } from 'react';
import ChatList from './ChatList';
import LoadingDots from './LoadingDots';
import request from '/app/lib/request'; 

const ChatWindow = ({ initialMessage }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatListRef = useRef(null);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
    setLoading(true);

    try {
      const response = await request('POST', 'http://localhost:3001/llm/generate', {
        userPrompt: message,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.content, sender: 'ai' },
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Failed to get a response from the model.', sender: 'ai' },
      ]);
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

  return (
    <div className="flex flex-col h-96 w-96 p-2 bg-white rounded-lg border border-neutral-300 shadow-md" style={{ height: '400px', width: '400px' }}>
      <div className="flex-1 w-full overflow-y-auto" ref={chatListRef}>
        <ChatList messages={messages} />
      </div>
      {loading && (
        <div className="flex justify-center items-center my-2">
          <LoadingDots />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;






