import { NextResponse } from "next/server";

const API_URL = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`;

export const POST = async (request: Request) => {
  try {
    // Parse the JSON request
    const { question } = await request.json();
    console.log("Received question:", question); // Log the incoming question for debugging

    // Make the API request to Google Gemini
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optionally use Authorization header
        // 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: {
          text: `Tell me ${question}` // Pass the question as part of the prompt
        }
      })
    });

    // Log the status and response headers for debugging
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Check if the response is successful (status code 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response data:', errorData); // Log the full error response
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Parse the response JSON
    const responseData = await response.json();
    console.log('Parsed response data:', responseData); // Log the full response data

    // Extract the generated reply
    const reply = responseData.candidates[0]?.output || 'No response generated';
    console.log('Generated reply:', reply); // Log the reply

    // Send the reply back as JSON response
    return NextResponse.json({ reply });
  } catch (error: any) {
    // Log the error message and return it in the response
    console.error('Error occurred:', error.message);
    return NextResponse.json({ error: error.message });
  }
};
