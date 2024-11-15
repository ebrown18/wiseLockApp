import { Stack } from "expo-router";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './login';
import Signup from './signUp';
import Index from './index';
import Generator from './generator';
import PassList from './passList';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Index} />
        <Stack.Screen name="PasswordGenerator" component={Generator} />
        <Stack.Screen name="PasswordList" component={PassList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
