import { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import ChatItem from './ChatItem';

export default function ChatList({ chats }) {
  const renderChatItem = useCallback((chatItem) => {
    return <ChatItem chatItem={chatItem} />;
  }, []);

  return (
    <FlatList
      style={styles.root}
      data={chats}
      renderItem={({ item }) => renderChatItem(item)}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
