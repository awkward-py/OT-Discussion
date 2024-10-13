import { NextResponse } from "next/server";

const API_URL = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`;

export const POST = async (request: Request) => {
  try {
    const { question } = await request.json();
    console.log("Received question:", question);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` // Optional
      },
      body: JSON.stringify({
        prompt: {
          text: `Tell me ${question}`
        }
      })
    });

    // Log status and headers
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Handle non-JSON responses (like HTML errors)
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType?.includes('application/json')) {
      const errorText = await response.text();
      console.error('Error response text:', errorText); // Log the HTML error page
      throw new Error(`Unexpected response format: ${errorText}`);
    }

    // Parse and log the JSON response
    const responseData = await response.json();
    console.log('Parsed response data:', responseData);

    const reply = responseData.candidates[0]?.output || 'No response generated';
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Error occurred:', error.message);
    return NextResponse.json({ error: error.message });
  }
};
