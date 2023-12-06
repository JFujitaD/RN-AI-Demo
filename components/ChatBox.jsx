import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';

export default function ChatBox({ onSend }) {
  const [chatValue, setChatValue] = useState('');

  const handleTextChange = (text) => {
    setChatValue(text);
  };

  const handleOnSend = () => {
    onSend(chatValue);
    setChatValue('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.textInput}
        placeholder='Ask your question here...'
        value={chatValue}
        onChangeText={handleTextChange}
        autoCapitalize={'sentences'}
        autoCorrect
      />
      <Pressable onPress={handleOnSend}>
        <Ionicons name='send-outline' size={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 12,
    padding: 12,
    borderRadius: 12,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
});
