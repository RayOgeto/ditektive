import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import ChatBubble from '../components/ChatBubble';

export default function MessagesScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Detective, we need you on a new case.", sender: "npc" },
    { id: 2, text: "I’m on it. Send me the details.", sender: "player" }
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      <ScrollView style={{ padding: 10 }}>
        {messages.map(m => (
          <ChatBubble key={m.id} text={m.text} sender={m.sender} />
        ))}
      </ScrollView>
    </View>
  );
}
