import { NextResponse } from "next/server";

// Make sure the API URL is correct
const API_URL = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`;

export const POST = async (request: Request) => {
  try {
    const { question } = await request.json();
    console.log("Received question:", question); // Debugging step

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // No Authorization header needed here, API key is passed in the URL
      },
      body: JSON.stringify({
        prompt: {
          text: `Tell me ${question}`
        }
      })
    });

    console.log('Response status:', response.status); // Debug the response status

    // Check if the response is not ok and if it's HTML instead of JSON
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType?.includes('application/json')) {
      const errorText = await response.text();
      console.error('Error response text:', errorText); // This will log the HTML error page
      throw new Error(`Unexpected response format: ${errorText}`);
    }

    // Process the JSON response
    const responseData = await response.json();
    console.log('Parsed response data:', responseData); // Log the actual JSON response

    const reply = responseData.candidates[0]?.output || 'No response generated';
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Error occurred:', error.message);
    return NextResponse.json({ error: error.message });
  }
};
