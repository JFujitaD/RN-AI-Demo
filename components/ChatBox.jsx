import { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatBox({ onSend }) {
  const [chatValue, setChatValue] = useState('');

  const handleTextChange = useCallback((text) => {
    setChatValue(text);
  }, []);

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
      <Pressable onPress={() => onSend(chatValue)}>
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
    fontSize: 18,
    flex: 1,
    marginRight: 8,
  },
});
