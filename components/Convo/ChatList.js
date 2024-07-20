import React, { forwardRef } from 'react';
import { Message } from '/components/Convo/Message.js';

const ChatList = forwardRef((props, ref) => {
  const { messages } = props;

  return (
    <div ref={ref} className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
});

ChatList.displayName = 'ChatList';

export default ChatList;
