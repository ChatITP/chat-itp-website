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
        className="user-messages bg-white/60 text-black p-2 rounded-t-md overflow-auto"
        style={{ height: '110px' }}
        ref={userMessagesRef}
      >
        {userMessages.map((message, index) => (
          <div key={index} className="p-2 my-2 rounded-md">
            {message.text}
          </div>
        ))}
      </div>
      <div className="other-messages flex-1 overflow-auto p-2 bg-grey2 rounded-b-md">
        {otherMessages.map((message, index) => (
          <div key={index} className="p-2 my-2 rounded-md">
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;





// const ChatList = ({ messages }) => {
//   return (
//     <div className="chat-list">
//       {messages.map((message, index) => (
//         <div
//           key={index}
//           className={`p-2 my-2 rounded-md ${
//             message.sender === "user" ? "bg-blue" : "bg-purple"
//           } `}
//         >
//           {message.text}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatList;


