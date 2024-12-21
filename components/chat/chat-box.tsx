'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MessageList } from './message-list';
import { ChatInput } from './input';
import { Message } from '@/lib/types';
import { sendMessage } from '@/lib/chat-service';
import { toast } from 'sonner';

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { response, error } = await sendMessage(input.trim());
      
      if (error) {
        toast.error(error);
        return;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-2rem)] mx-auto max-w-2xl">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput 
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Card>
  );
}