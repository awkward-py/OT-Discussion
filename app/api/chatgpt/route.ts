import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`  
      },
      body: JSON.stringify({
        prompt: {
          text: `Tell me ${question}`  // Adjust according to Gemini's API input structure
        }
      })
    });

    const responseData = await response.json();
    const reply = responseData.candidates[0]?.output || 'No response generated'; 

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
