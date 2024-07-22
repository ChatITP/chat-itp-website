import React, { useRef, useEffect } from 'react';
import { Card } from '/components/Convo/Card.js';
import ReactMarkdown from 'react-markdown';

export const Message = ({ text, sender }) => {
  const messageStyles =
    sender === 'user'
      ? 'bg-purple text-black self-end'
      : 'bg-neutral-100 text-black self-start';

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'text-center'} mb-2`}>
      <Card className={`p-3 rounded-lg max-w-lg ${messageStyles}`}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </Card>
    </div>
  );
};

const getTextColorClass = (text) => {
  switch (text.toLowerCase()) {
    case 'what':
      return 'text-red';
    case 'is':
      return 'text-yellow';
    case 'the most common':
      return 'text-blue';
    case 'historical':
      return 'text-yellow';
    case 'theme':
      return 'text-green';
    case 'of':
      return 'text-gray';
    case 'itp projects':
      return 'text-lightBlue';
    case '?':
      return 'text-gray2';
    default:
      return 'text-white/80';
  }
};

const ChatList = ({ messages }) => {
  const userMessages = messages.filter(message => message.sender === 'user');
  const otherMessages = messages.filter(message => message.sender !== 'user');
  const userMessagesRef = useRef(null);

  useEffect(() => {
    if (userMessagesRef.current) {
      userMessagesRef.current.scrollTop = userMessagesRef.current.scrollHeight;
    }
  }, [userMessages]);

  return (
    <div className="chat-list flex flex-col h-full">
      <div
        className="user-messages bg-gray/50 text-white/80 pt-3 px-5 rounded-t-2xl overflow-auto text-base"
        style={{ height: '110px' }}
        ref={userMessagesRef}
      >
        {userMessages.map((message, index) => (
          <div key={index} className={`p-2 my-2 rounded-md ${getTextColorClass(message.text)}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="other-messages flex-1 overflow-auto p-2 mb-5 rounded-b-2xl text-white/75">
        {otherMessages.map((message, index) => (
          <div key={index} className={`p-2 my-2 rounded-md text-white`}>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;

