import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from './src/screens/IntroScreen';
import HomeScreen from './src/screens/HomeScreen';

import ChatScreen from "./src/screens/messages/ChatScreen";
import ChatListScreen from "./src/screens/messages/ChatListScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Messages" component={ChatListScreen} options={{ title: "Messages" }} />
        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: "Messages"}} />
        <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params?.name || "chat" })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
