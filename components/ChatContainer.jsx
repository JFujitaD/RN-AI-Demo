import { useCallback, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ChatList from './ChatList';
import ChatBox from './ChatBox';

export default function ChatContainer() {
  const [chats, setChats] = useState([
    {
      id: 1,
      message: 'I am feeling down. Please help me.',
      isSender: true,
    },
    {
      id: 2,
      message: 'Try reading a book or relaxing somewhere quiet.',
    },
    {
      id: 3,
      message:
        "I will try that, but is there anything else that I can try? Reading isn't my favorite activity after all.",
      isSender: true,
    },
    {
      id: 4,
      message:
        'Do you have any favorite places to go? Getting out of the house can provide immediate benefits to overall mood.',
    },
  ]);

  const handleOnSend = useCallback((message) => {
    setChats((oldChats) => [
      ...oldChats,
      { id: new Date().getMilliseconds(), message, isSender: true },
    ]);
  }, []);

  return (
    <View style={styles.root}>
      <ChatList chats={chats} />
      <ChatBox onSend={handleOnSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
