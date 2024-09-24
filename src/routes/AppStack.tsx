import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@screens/app/HomeScreen';

export type AppStackParamList = {
  HomeScreen: undefined;
};
export function AppStack() {
  const Stack = createNativeStackNavigator<AppStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
