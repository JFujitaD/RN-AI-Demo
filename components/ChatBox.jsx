import { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import { Audio } from 'expo-av';

import RecordingModal from './RecordingModal';
import { getAIResponse } from '../utils/aiServices';

export default function ChatBox({ onSend }) {
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [chatValue, setChatValue] = useState('');
  const [recordingData, setRecordingData] = useState();

  const handleTextChange = (text) => {
    setChatValue(text);
  };

  const handleOnSend = async () => {
    if (chatValue.length === 0) return;
    onSend(chatValue, true);
    setChatValue('');
    Keyboard.dismiss();

    const responseMessage = await getAIResponse(chatValue);
    onSend(responseMessage, false);
  };

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecordingData(recording);
    } catch (e) {
      Alert.alert('Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      await recordingData.stopAndUnloadAsync();
      const uri = recordingData.getURI();
      setRecordingData(undefined);
      // TODO Enable
    } catch (e) {
      Alert.alert('Failed to stop recording');
    }
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
      startRecording();
    }
  };

  return (
    <View style={styles.root}>
      <RecordingModal
        isShown={!!recordingData}
        onStopRecording={stopRecording}
      />
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
