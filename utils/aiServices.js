const API_KEY = process.env.EXPO_PUBLIC_OPEN_AI_API_KEY;
const LANGUAGE_MODEL = 'gpt-3.5-turbo';
const SYSTEM_CONTEXT = 'You are a concise psychologist';

export const getAIResponse = async (prompt) => {
  const url = `https://api.openai.com/v1/chat/completions`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  };
  const body = {
    model: LANGUAGE_MODEL,
    messages: [
      {
        role: 'system',
        content: SYSTEM_CONTEXT,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  };
  const request = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, request);
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (e) {
    console.error(e);
  }
};
