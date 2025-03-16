require('dotenv').config({ path: './app/.env.local' })

async function testDeepSeekAPI() {
  console.log('Environment Variables:');
  console.log(process.env);
  
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    console.error('No API key found in environment variables');
    return;
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Say hello in a creative way." },
        ],
        stream: false,
      }),
    });

    console.log('Response Status:', response.status);
    
    const responseText = await response.text();
    console.log('Full Response:', responseText);

    if (!response.ok) {
      console.error('API Request Failed');
      return;
    }

    const data = JSON.parse(responseText);
    console.log('AI Response:', data.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error testing DeepSeek API:', error);
  }
}

testDeepSeekAPI();
