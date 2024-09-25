import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '@screens/app/HomeScreen';
import {NewPostScreen} from '@screens/app/NewPostScreen';
import {FavoriteScreen} from '@screens/app/FavoriteScreen';
import {MyProfileScreen} from '@screens/app/MyProfileScreen';

export type AppTabBottomTabParamList = {
  HomeScreen: undefined;
  NewPostScreen: undefined;
  FavoriteScreen: undefined;
  MyProfileScreen: undefined;
};
export function AppTabNavigator() {
  const Tab = createBottomTabNavigator<AppTabBottomTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="NewPostScreen" component={NewPostScreen} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Tab.Screen name="MyProfileScreen" component={MyProfileScreen} />
    </Tab.Navigator>
  );
}
