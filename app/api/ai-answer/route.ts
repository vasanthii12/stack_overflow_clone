import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // Log the entire request body for debugging
    const requestBody = await req.json();
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));
    
    const { title, description, tags } = requestBody;

    // Validate input
    if (!title || !description || !tags) {
      console.error('Missing required fields');
      return NextResponse.json({ 
        error: "Missing required fields",
        details: { title, description, tags }
      }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    // Validate API key
    if (!apiKey) {
      console.error('DEEPSEEK_API_KEY is not set');
      return NextResponse.json({ 
        error: "API key is not configured" 
      }, { status: 500 });
    }

    const question = `Title: ${title}\nDescription: ${description}\nTags: ${tags.join(", ")}`

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant specialized in providing concise and accurate technical answers to programming questions." },
          { role: "user", content: question },
        ],
        stream: false,
        max_tokens: 300,
      }),
    });

    // Log the full response for debugging
    const responseText = await response.text();
    console.log('Full API Response Text:', responseText);

    if (!response.ok) {
      console.error(`DeepSeek API Error: ${response.status} - ${responseText}`);
      return NextResponse.json({ 
        error: "Failed to fetch AI answer", 
        details: responseText 
      }, { status: response.status });
    }

    // Parse the response text as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
      return NextResponse.json({ 
        error: "Failed to parse AI response", 
        details: responseText 
      }, { status: 500 });
    }

    // Log the parsed data
    console.log('Parsed API Response:', JSON.stringify(data, null, 2));
    
    // Extract and return the AI answer
    const aiAnswer = data.choices?.[0]?.message?.content || "No response from AI";
    console.log('Extracted AI Answer:', aiAnswer);
    
    // Ensure a consistent response structure
    return NextResponse.json({ 
      answer: aiAnswer,
      original_request: { title, description, tags }
    });

  } catch (error: unknown) {
    console.error("Route Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json({ 
      error: "Error processing request", 
      details: errorMessage 
    }, { status: 500 });
  }
}
