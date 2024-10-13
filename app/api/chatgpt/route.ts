// pages/api/generate.ts (or /app/api/generate/route.ts for Next.js 13+)
import { NextResponse } from "next/server";

// Correct API endpoint
const API_URL = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`;

export const POST = async (request: Request) => {
  try {
    // Parse the incoming request
    const { question } = await request.json();
    console.log("Received question:", question);

    // Optional: Log the API URL and key (ensure not to log sensitive information in production)
    // console.log("API_URL:", API_URL);
    // console.log("API_KEY:", process.env.GEMINI_API_KEY);

    // Prepare the request payload
    const payload = {
      prompt: {
        text: `Tell me ${question}`
      }
    };
    console.log("Request payload:", JSON.stringify(payload, null, 2));

    // Make the API request
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Alternatively, use the Authorization header
        // 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    // Log response status and headers
    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify([...response.headers]));

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await response.text();
      console.error('Non-JSON response received:', errorText);
      throw new Error('Invalid response format from API');
    }

    // Parse the JSON response
    const responseData = await response.json();
    console.log('API response data:', JSON.stringify(responseData, null, 2));

    // Extract the reply
    const reply = responseData.candidates && responseData.candidates.length > 0
      ? responseData.candidates[0].output
      : 'No response generated';

    console.log('Generated reply:', reply);

    // Return the reply
    return NextResponse.json({ reply });
  } catch (error: any) {
    // Log the error
    console.error('Error occurred:', error.message);

    // Return the error message
    return NextResponse.json({ error: error.message });
  }
};
