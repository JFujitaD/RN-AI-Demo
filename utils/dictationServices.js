const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const BUCKET = 'rn-ai-demo-bucket';

export const uploadAudio = async (uri) => {
  const url = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET}/o?uploadType=media&name=${new Date().getMilliseconds()}.m4a`;
  const headers = {
    'Content-Type': 'm4a',
  };
  const body = {
    data: uri,
  };
  const request = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, request);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error('Error: ', JSON.stringify(e));
  }
};

export const convertToText = async (uri) => {
  const url = `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    config: {
      encoding: 'FLAC',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
      enableWordTimeOffsets: false,
    },
    audio: { uri },
  };
  const request = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, request);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error('Error: ', JSON.stringify(e));
  }
};
