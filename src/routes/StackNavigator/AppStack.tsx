import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AppTabBottomTabParamList,
  AppTabNavigator,
} from '@routes/TabNavigator/AppTabNavigator';
import {SettingsScreen} from '@screens/app/SettingsScreen';
import {NavigatorScreenParams} from '@react-navigation/native';
import {PostCommentScreen} from '@screens/app/PostComment';
import {ProfileScreen} from '@screens/app/ProfileScreen';

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  SettingsScreen: undefined;
  PostComment: {
    postId: number;
    postAuthorId: number;
  };
  ProfileScreen: {
    userId: number;
  };
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
      <Stack.Screen name="PostComment" component={PostCommentScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
