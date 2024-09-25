import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AppTabBottomTabParamList,
  AppTabNavigator,
} from '@routes/AppTabNavigator';
import {SettingsScreen} from '@screens/app/SettingsScreen';
import {NavigatorScreenParams} from '@react-navigation/native';

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  SettingsScreen: undefined;
};
export function AppStack() {
  const Stack = createNativeStackNavigator<AppStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
