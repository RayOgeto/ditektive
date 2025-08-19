// screens/ChatScreen.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getStartNodeId, getNode, isChoiceAvailable, applyEffects } from "../../utils/storyEngine";
import { loadTranscript, saveTranscript, loadProgress, saveProgress, loadFlags, saveFlags } from "../storage";
import { now } from "../../utils/time";

export default function ChatScreen({ route, navigation }) {
  const { contactId } = route.params;
  const [transcript, setTranscript] = useState([]);
  const [node, setNode] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [flags, setFlags] = useState({});
  const typingTimer = useRef(null);
  const delayedTimer = useRef(null);

  // Load on mount
  useEffect(() => {
    (async () => {
      const [t, p, f] = await Promise.all([
        loadTranscript(contactId),
        loadProgress(contactId),
        loadFlags(contactId)
      ]);
      setTranscript(t);
      setFlags(f);

      let currentNodeId = p.nodeId;
      if (!currentNodeId) {
        currentNodeId = getStartNodeId(contactId);
        await saveProgress(contactId, currentNodeId);
        await playNpcLine(currentNodeId, t); // initial NPC line
      } else {
        setNode(getNode(contactId, currentNodeId));
      }
    })();

    return () => {
      clearTimeout(typingTimer.current);
      clearTimeout(delayedTimer.current);
    };
  }, [contactId]);

  async function appendMessage(msg) {
    const next = [...transcript, msg];
    setTranscript(next);
    await saveTranscript(contactId, next);
  }

  async function playNpcLine(nextNodeId, baseTranscript = transcript) {
    const nextNode = getNode(contactId, nextNodeId);
    setNode(nextNode);

    // Typing indicator
    setIsTyping(true);
    const typingMs = nextNode?.npc?.typingMs ?? 600;
    const delayMs = nextNode?.npc?.delayMs ?? 0;

    // If there's a scheduled delay, wait that first (message "arrives later")
    delayedTimer.current = setTimeout(() => {
      typingTimer.current = setTimeout(async () => {
        setIsTyping(false);
        const npcMsg = { sender: "npc", text: nextNode.npc.text, ts: now() };
        const newTranscript = [...baseTranscript, npcMsg];
        setTranscript(newTranscript);
        await saveTranscript(contactId, newTranscript);
        await saveProgress(contactId, nextNodeId);
      }, typingMs);
    }, delayMs);
  }

  async function choose(choice) {
    // Apply effects (flags) if any
    const updated = applyEffects(choice.effects, flags);
    if (updated !== flags) {
      setFlags(updated);
      await saveFlags(contactId, updated);
    }

    // Append player line
    await appendMessage({ sender: "me", text: choice.text, ts: now() });

    // Move to next node + play NPC line
    if (choice.next != null) {
      await playNpcLine(choice.next);
    } else {
      setNode(null); // End
    }
  }

  // Choices filtered by flags
  const availableChoices = node?.choices?.filter(c => isChoiceAvailable(c, flags)) || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={transcript}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.sender === "me" ? styles.me : styles.npc]}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      {/* Typing indicator */}
      {isTyping && (
        <View style={[styles.typingRow]}>
          <ActivityIndicator size="small" />
          <Text style={{ marginLeft: 8, color: "#666" }}>Alex is typing…</Text>
        </View>
      )}
      {/* Choice buttons */}
      {availableChoices.length > 0 && (
        <View style={styles.choices}>
          {availableChoices.map((c, idx) => (
            <TouchableOpacity key={idx} style={styles.choiceBtn} onPress={() => choose(c)}>
              <Text style={styles.choiceText}>{c.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  bubble: { maxWidth: "78%", padding: 10, borderRadius: 12, marginVertical: 4 },
  me: { alignSelf: "flex-end", backgroundColor: "#d6f8cf" },
  npc: { alignSelf: "flex-start", backgroundColor: "#fff" },
  typingRow: { flexDirection: "row", alignItems: "center", padding: 12, borderTopWidth: 1, borderColor: "#eee" },
  choices: { padding: 12, borderTopWidth: 1, borderColor: "#eee" },
  choiceBtn: { backgroundColor: "#1e90ff", padding: 12, borderRadius: 10, marginVertical: 4 },
  choiceText: { color: "#fff", fontWeight: "600", textAlign: "center" }
});
