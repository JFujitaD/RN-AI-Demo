import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import { Audio } from 'expo-av';

import { debug } from '../utils/dictationServices';

export default function ChatBox({ onSend }) {
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [chatValue, setChatValue] = useState('');

  const handleTextChange = (text) => {
    setChatValue(text);
  };

  const handleOnSend = () => {
    if (chatValue.length === 0) return;
    onSend(chatValue);
    setChatValue('');
    Keyboard.dismiss();
  };

  const dictate = async () => {
    debug();
  };

  const handleOnDictate = async () => {
    if (!permissionResponse.granted) {
      // No permission
      const pr = await requestPermission();
      if (!pr.granted) {
        Alert.alert(
          'Insufficient Permissions',
          'The app needs permission to use the microphone.'
        );
      }
    } else {
      // Start dictation
      dictate();
    }
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
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={handleOnDictate}
      >
        <Ionicons name='mic-outline' size={20} />
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.pressableIcon,
          pressed && styles.pressed,
        ]}
        onPress={handleOnSend}
      >
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
  pressableIcon: {
    marginLeft: 12,
  },
  pressed: {
    opacity: 0.5,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
});
