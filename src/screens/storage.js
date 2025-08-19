// storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = (k) => `elmwood:${k}`;

export async function loadTranscript(contactId) {
  const raw = await AsyncStorage.getItem(key(`transcript:${contactId}`));
  return raw ? JSON.parse(raw) : [];
}
export async function saveTranscript(contactId, transcript) {
  await AsyncStorage.setItem(key(`transcript:${contactId}`), JSON.stringify(transcript));
}

export async function loadProgress(contactId) {
  const raw = await AsyncStorage.getItem(key(`progress:${contactId}`));
  return raw ? JSON.parse(raw) : { nodeId: null };
}
export async function saveProgress(contactId, nodeId) {
  await AsyncStorage.setItem(key(`progress:${contactId}`), JSON.stringify({ nodeId }));
}

export async function loadFlags(contactId) {
  const raw = await AsyncStorage.getItem(key(`flags:${contactId}`));
  return raw ? JSON.parse(raw) : {};
}
export async function saveFlags(contactId, flags) {
  await AsyncStorage.setItem(key(`flags:${contactId}`), JSON.stringify(flags));
}
