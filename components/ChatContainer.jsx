import { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';

import { DUMMY_CHAT } from '../constants/dummyChat';
import ChatList from './ChatList';
import ChatBox from './ChatBox';

export default function ChatContainer() {
  const [chats, setChats] = useState(DUMMY_CHAT);

  const handleOnSend = (message, isSender) => {
    setChats((oldChats) => [
      ...oldChats,
      { id: new Date().getMilliseconds(), message, isSender },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ChatList chats={chats} />
      <ChatBox onSend={handleOnSend} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
