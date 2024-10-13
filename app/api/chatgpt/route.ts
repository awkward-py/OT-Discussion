// Import necessary modules from Next.js
import { NextResponse } from "next/server";

// Define the API URL with the Gemini API key from environment variables
const API_URL = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`;

// The POST request handler function
export const POST = async (request: Request) => {
  // Parse the JSON request to extract the question
  const { question } = await request.json();

  try {
    // Make a fetch request to the Gemini API
    const response = await fetch(API_URL, {
      method: 'POST', // The method is POST
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON
        // Optionally, you can use the Authorization header for added security
        // 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: {
          text: `Tell me ${question}`  // Format the prompt to include the question
        }
      })
    });

    // Check if the response status is not OK (i.e., not 2xx)
    if (!response.ok) {
      // Parse the error response
      const errorData = await response.json();
      console.error('Error response:', errorData);
      // Throw an error with the status code for better error handling
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Parse the response as JSON
    const responseData = await response.json();
    console.log('Response data:', responseData);  // Log the response for debugging

    // Extract the reply text from the response data
    const reply = responseData.candidates[0]?.output || 'No response generated';

    // Return the reply as a JSON response
    return NextResponse.json({ reply });
  } catch (error: any) {
    // If an error occurs, log it and return the error message as a JSON response
    console.error('Error during API request:', error.message);
    return NextResponse.json({ error: error.message });
  }
};
