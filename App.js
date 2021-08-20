import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home,Live,Join,AddStream,WatchStream,Video,Videojoin } from "./components";

const Stack = createStackNavigator();

export default function App() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={options} />
        <Stack.Screen name="Live" component={Live} options={options} />
        <Stack.Screen name="Join" component={Join} options={options} />
        <Stack.Screen name="AddStream" component={AddStream} options={options} />
        <Stack.Screen name="WatchStream" component={WatchStream} options={options} />
        <Stack.Screen name="Video" component={Video} options={options} />
        <Stack.Screen name="Videojoin" component={Videojoin} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});