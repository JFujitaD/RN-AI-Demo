import { StyleSheet, FlatList } from 'react-native';
import { useEffect, useRef } from 'react';

import ChatItem from './ChatItem';

export default function ChatList({ chats }) {
  const flatListRef = useRef();

  useEffect(() => {
    console.log('SCROLLING TO THE BOTTOM');
    flatListRef.current.scrollToEnd({ animated: true });
  }, [chats]);

  const renderChatItem = (chatItem) => {
    return <ChatItem chatItem={chatItem} />;
  };

  return (
    <FlatList
      ref={flatListRef}
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
