'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/lib/types';
import { ChatMessage } from './message';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}