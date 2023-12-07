import { StyleSheet, View, Text } from 'react-native';

import { COLORS } from '../constants/colors';

export default function ChatItem({ chatItem }) {
  const isSender = chatItem.isSender;

  return (
    <View style={styles.rowContainer}>
      {isSender && <View style={styles.flex}></View>}
      <View style={[styles.root, isSender ? styles.sender : styles.receiver]}>
        <Text style={styles.text}>{chatItem.message}</Text>
      </View>
      {!isSender && <View style={styles.flex}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    padding: 12,
    margin: 12,
    borderRadius: 12,
    maxWidth: '75%',
    elevation: 8,
    shadowRadius: 8,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  flex: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  sender: {
    backgroundColor: COLORS.senderChat,
  },
  receiver: {
    backgroundColor: COLORS.receiverChat,
  },
});
