import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';

export default function RecordingModal({ isShown, onStopRecording }) {
  return (
    <Modal visible={isShown} animationType='slide' transparent>
      <View style={styles.modal}>
        <Text style={styles.title}>Recording...</Text>
        <Pressable
          onPress={onStopRecording}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Ionicons name='mic-off-circle-outline' size={128} />
        </Pressable>
        <Text>Click the icon to stop recording</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.recordingOverlay,
    marginHorizontal: 64,
    marginVertical: 256,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
