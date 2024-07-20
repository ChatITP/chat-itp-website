import React, { useState, useRef, useEffect } from 'react';
import ChatList from './ChatList';
import ChatBottombar from '/components/Convo/ChatButtonbar.js';
import LoadingDots from './LoadingDots';
import request from '/app/lib/request'; 
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '/components/Convo/Select.js';
import { Button } from '/components/Convo/Button.js';
import { SaveIcon } from 'lucide-react';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const chatListRef = useRef(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await request('GET', 'http://localhost:3001/db/prompts');
        setPrompts(response.data);
        setSelectedPrompt(response.data[0]?.system_prompt || '');
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };

    const fetchSessions = async () => {
      try {
        const response = await request('GET', 'http://localhost:3001/llm/sessions');
        setSessions(response.data.sessions || []);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchPrompts();
    fetchSessions();
  }, []);

  useEffect(() => {
    handleSendMessage("What is the most innovative ITP project?");
  }, []);

  const initializeConversation = async (systemPrompt) => {
    try {
      await request('POST', 'http://localhost:3001/llm/initialize', { systemPrompt });
    } catch (error) {
      console.error('Error initializing conversation:', error);
    }
  };

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
      console.error('Response data:', error.response ? error.response.data : null);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Failed to get a response from the model.', sender: 'ai' },
      ]);
      setLoading(false);
    }
  };

  const handleSaveSession = async () => {
    try {
      const response = await request('POST', 'http://localhost:3001/llm/save-session', {
        sessionId: selectedSessionId,
        messages,
      });
      setSelectedSessionId(response.data.sessionId);
      alert('Session saved successfully.');
      const updatedSessionsResponse = await request('GET', 'http://localhost:3001/llm/sessions');
      setSessions(updatedSessionsResponse.data.sessions || []);
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Failed to save session.');
    }
  };

  const handleLoadSession = async (sessionId) => {
    try {
      if (!sessionId) {
        alert('Session ID is required to load the session.');
        return;
      }
      const response = await request('POST', 'http://localhost:3001/llm/load-session', { sessionId });
      const loadedMessages = response.data.messages.map((msg) => ({
        text: msg.content,
        sender: msg.role === 'user' ? 'user' : 'ai',
      }));
      setMessages(loadedMessages);

      await request('POST', 'http://localhost:3001/llm/initialize-with-messages', {
        messages: response.data.messages,
      });
    } catch (error) {
      console.error('Error loading session:', error);
    }
  };

  const handleResetSession = async () => {
    try {
      await request('POST', 'http://localhost:3001/llm/reset-session');
      setMessages([]);
      alert('Session reset successfully.');
    } catch (error) {
      console.error('Error resetting session:', error);
      alert('Failed to reset session.');
    }
  };

  useEffect(() => {
    if (selectedPrompt) {
      initializeConversation(selectedPrompt);
    }
  }, [selectedPrompt]);

  useEffect(() => {
    if (selectedSessionId) {
      handleLoadSession(selectedSessionId);
    }
  }, [selectedSessionId]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-96 w-96 p-2 bg-white rounded-lg border border-neutral-300 shadow-md" style={{ height: '400px', width: '400px' }}>
      <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <label htmlFor="promptSelector" className="block text-sm font-medium text-gray-700 mb-1">
            Select a Prompt:
          </label>
          <Select
            value={selectedPrompt}
            onValueChange={(value) => setSelectedPrompt(value)}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Select a prompt" />
            </SelectTrigger>
            <SelectContent>
              {prompts.map((prompt) => (
                <SelectItem key={prompt._id} value={prompt.system_prompt}>
                  {prompt.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-2 md:mb-0">
          <label htmlFor="sessionSelector" className="block text-sm font-medium text-gray-700 mb-1">
            Select a Session:
          </label>
          <Select
            value={selectedSessionId}
            onValueChange={(value) => setSelectedSessionId(value)}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Select a session" />
            </SelectTrigger>
            <SelectContent>
              {sessions.map((session) => (
                <SelectItem key={session.sessionId} value={session.sessionId}>
                  {formatDate(session.createdAt)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            onClick={handleSaveSession}
            className="text-black px-2 py-1 rounded-lg"
          >
            <SaveIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full overflow-y-auto" ref={chatListRef}>
        <ChatList messages={messages} />
      </div>
      {loading && (
        <div className="flex justify-center items-center my-2">
          <LoadingDots />
        </div>
      )}
      {/* <ChatBottombar onSendMessage={handleSendMessage} /> */}
    </div>
  );
};

export default ChatWindow;

