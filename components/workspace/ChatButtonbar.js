import React, { useState } from 'react';

const ChatBottombar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('What is the most innovative ITP project?');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md space-x-2">
      <div className="flex items-center flex-grow space-x-1 bg-white rounded-lg p-2 border border-gray-300">
        <span className="px-2 py-1 bg-red-100 rounded-full">What</span>
        <input
          className="flex-grow px-2 py-1 outline-none"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
        />
        <span className="px-2 py-1 bg-yellow-100 rounded-full">is the most</span>
        <span className="px-2 py-1 bg-green-100 rounded-full">innovative</span>
        <span className="px-2 py-1 bg-blue-100 rounded-full">ITP</span>
        <span className="px-2 py-1 bg-purple-100 rounded-full">project</span>
      </div>
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default ChatBottombar;



