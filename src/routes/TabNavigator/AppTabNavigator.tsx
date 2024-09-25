import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '@screens/app/HomeScreen';
import {NewPostScreen} from '@screens/app/NewPostScreen';
import {FavoriteScreen} from '@screens/app/FavoriteScreen';
import {MyProfileScreen} from '@screens/app/MyProfileScreen';
import {AppTabs} from '@routes/TabNavigator/AppTabs';

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
      }}
      tabBar={props => renderAppTabs(props)}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="NewPostScreen" component={NewPostScreen} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Tab.Screen name="MyProfileScreen" component={MyProfileScreen} />
    </Tab.Navigator>
  );
}

const renderAppTabs = (props: BottomTabBarProps) => {
  return <AppTabs {...props} />;
};
