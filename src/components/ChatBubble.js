import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ text, sender }) {
  const isPlayer = sender === "player";
  return (
    <View style={[styles.bubble, isPlayer ? styles.player : styles.npc]}>
      <Text style={{ color: 'white' }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    maxWidth: '75%',
  },
  player: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb'
  },
  npc: {
    alignSelf: 'flex-start',
    backgroundColor: '#374151'
  }
});
