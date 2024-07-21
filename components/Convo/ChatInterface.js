import React, { useState, useEffect, useRef } from 'react';
import request from '/app/lib/request.js'; 
import { Button } from '@/components/Convo/Button'; 
import LoadingDots from '@/components/Convo/LoadingDots';
import BlockSelector from './BlockSelector';
import Block from './Block'; 

const DottedLine = () => (
  <svg width="32" height="2" className="mx-1">
    <line x1="0" y1="1" x2="32" y2="1" stroke="black" strokeWidth="2" strokeDasharray="2 4"/>
  </svg>
);

const fetchSuggestionsFromBackend = async (selectedBlocks) => {
  try {
    const response = await request('POST', 'http://localhost:3001/llm/suggestions', { selectedBlocks });
    console.log('Fetched suggestions:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};

const ChatInterface = () => {
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [suggestions, setSuggestions] = useState(['what', 'who', 'when', 'where', 'why', 'how']);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatListRef = useRef(null);

  const handleBlockSelect = async (text) => {
    if (text === '?') {
      const completeQuestion = [...selectedBlocks, text];
      await sendMessageToModel(completeQuestion);
      setSelectedBlocks([]);
      setSuggestions(['what', 'who', 'when', 'where', 'why', 'how']);
    } else {
      const newSelectedBlocks = [...selectedBlocks, text];
      setSelectedBlocks(newSelectedBlocks);
      const newSuggestions = await fetchSuggestionsFromBackend(newSelectedBlocks);
      setSuggestions(newSuggestions);
    }
  };

  const sendMessageToModel = async (question) => {
    setLoading(true);
    setShowSuggestions(false);
    try {
      const response = await request('POST', 'http://localhost:3001/llm/generate', {
        userPrompt: question.join(' '),
      });
      setMessages([...messages, { question, answer: response.data.content }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, { question, answer: 'Failed to get a response from the model.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleAskAgain = () => {
    setShowSuggestions(true);
    setSelectedBlocks([]);
    setSuggestions(['what', 'who', 'when', 'where', 'why', 'how']);
  };

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-4 w-[600px] bg-white text-black rounded-lg shadow-lg flex flex-col max-h-96">
      <div className="flex-1 overflow-y-auto mb-4" ref={chatListRef}>
        {messages.map((message, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center justify-start mb-2 bg-gray-100 p-4 rounded-md shadow-inner min-h-20 overflow-x-auto">
              {message.question.map((block, blockIndex) => (
                <React.Fragment key={blockIndex}>
                  <Block text={block} index={blockIndex} onSelect={() => {}} />
                  {blockIndex < message.question.length - 1 && <DottedLine />}
                </React.Fragment>
              ))}
            </div>
            <div className="bg-blue-100 p-4 rounded-md w-fit overflow-scroll">
              <p>{message.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        {showSuggestions ? (
          <>
            <div className="flex items-center justify-start mb-4 bg-gray-100 p-4 rounded-md shadow-inner min-h-20 overflow-x-auto">
              {selectedBlocks.map((block, index) => (
                <React.Fragment key={index}>
                  <Block text={block} index={index} onSelect={() => {}} />
                  {index < selectedBlocks.length - 1 && <DottedLine />}
                </React.Fragment>
              ))}
              {selectedBlocks.length > 0 && (
                <>
                  <DottedLine />
                  <Block text="?" index={selectedBlocks.length} onSelect={handleBlockSelect} />
                </>
              )}
            </div>
            <BlockSelector suggestions={suggestions} onSelect={handleBlockSelect} />
          </>
        ) : (
          <div className="flex flex-col">
            {loading && (
              <div className="flex justify-center items-center my-4">
                <LoadingDots />
              </div>
            )}
            <div className="flex justify-end text-black">
              <Button onClick={handleAskAgain}>Ask Again</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
