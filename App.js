import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import ChatContainer from './components/ChatContainer';
import { COLORS } from './constants/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatContainer />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
});
