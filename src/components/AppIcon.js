import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AppIcon({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 90,
    height: 90,
    margin: 10,
    backgroundColor: '#1e3a8a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  }
});
