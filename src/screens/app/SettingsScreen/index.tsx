import React from 'react';
import {Text} from '@components/Text';
import {AppRoutes} from '@routes/navigationProps';
import {Screen} from '@components/Screen';

export function SettingsScreen({navigation}: AppRoutes<'SettingsScreen'>) {
  return (
    <Screen>
      <Text
        onPress={() =>
          navigation.navigate('AppTabNavigator', {
            screen: 'FavoriteScreen',
          })
        }>
        Settings
      </Text>
    </Screen>
  );
}
