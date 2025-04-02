// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Ollama } from 'ollama';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });
const OLLAMA_MODEL = 'llama3.2'; // or llama3.2, ensure it's pulled

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    console.log(`Using model: ${OLLAMA_MODEL}`);
    console.log('Received messages:', messages);

    try{
        await ollama.show({model: OLLAMA_MODEL});
    } catch (modelError){
        console.error("Model does not exist", modelError);
        return NextResponse.json({error: "Model does not exist on ollama server"},{status: 400})
    }

    const stream = await ollama.chat({
      model: OLLAMA_MODEL,
      messages: messages,
      stream: true,
    });

    const encoder = new TextEncoder();

    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.message?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
            if (chunk.done) {
              console.log('Stream finished.');
              break;
            }
          }
        } catch (streamError) {
          console.error('Error reading Ollama stream:', streamError);
          controller.error(streamError);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(responseStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (apiError) {
    console.error('API Route Error:', apiError);
    const errorMessage = apiError instanceof Error ? apiError.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to connect to Ollama or process request', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Chat API is running. Use POST to send messages.' });
}