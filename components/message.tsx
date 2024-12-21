'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { MessageType } from './chat-box';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <Card className={cn(
        'max-w-[80%] p-3',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      )}>
        <p className="text-sm">{message.content}</p>
        <time className="text-xs opacity-50 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </time>
      </Card>
    </div>
  );
}