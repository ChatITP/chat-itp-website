import React from 'react';
import { Card } from '/components/Convo/Card.js';
import ReactMarkdown from 'react-markdown';

export const Message = ({ text, sender }) => {
  const messageStyles =
    sender === 'user'
      ? 'bg-purple text-black self-end'
      : 'bg-neutral-100 text-black self-start';

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
      <Card className={`p-3 rounded-lg max-w-lg ${messageStyles}`}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </Card>
    </div>
  );
};
