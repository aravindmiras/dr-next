// app/page.tsx
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setIsLoading(true);
    const newUserMessage: ChatMessage = { role: 'user', content: trimmedInput };
    const currentMessages = [...messages, newUserMessage];
    setMessages(currentMessages);
    setInput('');

    const assistantMessagePlaceholder: ChatMessage = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantMessagePlaceholder]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: currentMessages,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`API error: ${response.statusText} (status: ${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedContent += chunk;

        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].role === 'assistant') {
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              content: streamedContent,
            };
          }
          return updatedMessages;
        });
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-700">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-lg lg:max-w-xl px-4 py-2 rounded-lg shadow ${
                msg.role === 'user'
                  ? 'bg-black text-white'
                  : 'bg-green-300 text-black'
              }`}
            >
              {msg.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg shadow bg-white text-gray-500 italic">
              ...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-8 bg-gray-800 border-t border-gray-500 shadow-inner fixed bottom-0 left-0 w-full">
  <form onSubmit={handleSend} className="flex space-x-2">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your message..."
      className="flex-1 border border-gray-300 rounded-4xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      disabled={isLoading}
    />
    <button
      type="submit"
      className={`px-6 py-2 rounded-4xl text-white font-semibold ${
        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-800'
      }`}
      disabled={isLoading}
    >
      Send
    </button>
  </form>
</footer>
    </div>
  );
}