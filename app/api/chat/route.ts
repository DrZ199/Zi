import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Replace with your Hugging Face API endpoint and model
    const response = await fetch(
      'https://api-inference.huggingface.co/models/YOUR_MODEL_ID',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({ inputs: message }),
      }
    );

    const result = await response.json();
    
    return NextResponse.json({ response: result[0].generated_text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}