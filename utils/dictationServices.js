const RECOGNIZE_ENDPOINT =
  'POST https://speech.googleapis.com/v1/speech:recognize';

export const debug = () => {
  console.log('API KEY:', process.env.EXPO_PUBLIC_GOOGLE_API_KEY);
};
