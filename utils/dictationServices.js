const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const RECOGNIZE_ENDPOINT =
  'POST https://speech.googleapis.com/v1/speech:recognize';

export const convertToText = async (uri) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = { audio: { uri } };

    const audioResponse = await fetch(`${RECOGNIZE_ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
