"use client";

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
  role: 'human' | 'ai';
  content: string;
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const newUserMessage: Message = {
      role: 'human',
      content: inputText,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText('');

    try {
      const response = await axios.post('/api/ai/generate', {
        question: inputText,
        previousConversation: messages,
      });

      const newAIMessage: Message = {
        role: 'ai',
        content: response.data.answer,
      };

      setMessages((prevMessages) => [...prevMessages, newAIMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="chat-container" style={{ width: '400px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <div
        ref={chatContainerRef}
        style={{
          height: '500px',
          overflowY: 'auto',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginBottom: '10px'
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '5px',
              maxWidth: '70%',
              alignSelf: message.role === 'human' ? 'flex-end' : 'flex-start',
              backgroundColor: message.role === 'human' ? '#007bff' : '#f1f0f0',
              color: message.role === 'human' ? 'white' : 'black',
              alignItems: message.role === 'human' ? 'flex-end' : 'flex-start',
              marginLeft: message.role === 'human' ? 'auto' : '0',
            }}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{
            flexGrow: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px 0 0 5px'
          }}
          placeholder="Type your message here..."
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '0 5px 5px 0',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;