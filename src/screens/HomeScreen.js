import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppIcon from '../components/AppIcon';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppIcon title="Messages" onPress={() => navigation.navigate("Messages")} />
      <AppIcon title="Phone" />
      <AppIcon title="Browser" />
      <AppIcon title="Gallery" />
      <AppIcon title="Notes" />
      <AppIcon title="Settings" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a192f', // detective vibe wallpaper
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});
