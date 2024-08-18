"use client";

import React, {useEffect, useRef, useState} from 'react';
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

        // Your existing commented-out API call code...

        const newAIMessage: Message = {
            role: 'ai',
            content: 'Hello! How can I help you today?',
        };

        setMessages((prevMessages) => [...prevMessages, newAIMessage]);
    };

    if (!isClient) {
        return null; // or a loading spinner
    }

    return (
        <div className="w-full max-w-md mx-auto font-default">
            <div
                ref={chatContainerRef}
                className="h-[500px] overflow-y-auto p-4 border border-gray-300 rounded-2xl mb-4 bg-white/70 custom-scrollbar"
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 mb-2 rounded-lg max-w-[70%] ${
                            message.role === 'human'
                                ? 'ml-auto bg-violet-500 text-white'
                                : 'mr-auto bg-gray-200 text-black'
                        }`}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-grow p-2 text-base border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/70"
                    placeholder="Type your message here..."
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 text-base font-semibold text-white bg-pink-600 rounded-r-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default AIChatbot;