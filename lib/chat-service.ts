import { ChatResponse } from './types';

export async function sendMessage(message: string): Promise<ChatResponse> {
  try {
    const response = await fetch('YOUR_HUGGING_FACE_SPACE_URL/run/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [message] }),
    });

    const result = await response.json();
    return { response: result.data[0] };
  } catch (error) {
    console.error('Chat error:', error);
    return { 
      response: '',
      error: 'Failed to communicate with the chatbot' 
    };
  }
}