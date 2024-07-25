import React, { useState, useEffect, useRef } from 'react';
import request from '/app/lib/request.js';
import { Button } from '@/components/Convo/Button'; // Adjust this path if necessary
import LoadingDots from '@/components/Convo/LoadingDots';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // or whatever your root element is

const ChatInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const inputRef = useRef(null);

  const sendMessageToModel = async () => {
    setLoading(true);
    try {
      const response = await request('POST', process.env.NEXT_PUBLIC_API_URL+'/llm/generate', {
        userPrompt: prompt,
      });
      setAnswer(response.data.content);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error sending message:', error);
      setAnswer('Failed to get a response from the model.');
      setModalIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSendPrompt = (event) => {
    event.preventDefault();
    sendMessageToModel();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAnswer('');
    setPrompt('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalIsOpen]);

  return (
    <div className="p-4 w-full max-w-lg bg-white text-black rounded-lg shadow-lg flex flex-col">
      <form onSubmit={handleSendPrompt} className="mb-4">
        <textarea
          ref={inputRef}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          rows="4"
        />
        <Button type="submit" disabled={loading} className="mt-2">
          {loading ? <LoadingDots /> : 'Send'}
        </Button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Response Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Response</h2>
          <div className="mb-4">{answer}</div>
          <Button onClick={closeModal} className="mt-2">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ChatInterface;
