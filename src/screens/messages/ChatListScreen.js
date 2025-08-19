// screens/ChatListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import contacts from "./stories/contacts";
import { loadTranscript } from "../storage";

export default function ChatListScreen({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const rows = [];
      for (const c of contacts) {
        const t = await loadTranscript(c.id);
        const last = t[t.length - 1];
        rows.push({
          id: c.id,
          name: c.name,
          lastText: last?.text || "Tap to start",
          lastTs: last?.ts || 0
        });
      }
      rows.sort((a, b) => b.lastTs - a.lastTs);
      setItems(rows);
    };
    const unsub = navigation.addListener("focus", load);
    load();
    return unsub;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Chat", { contactId: item.id, name: item.name })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.preview} numberOfLines={1}>{item.lastText}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  name: { fontSize: 16, fontWeight: "600" },
  preview: { marginTop: 4, color: "#666" }
});
