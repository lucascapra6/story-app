import React from 'react';
import {Screen} from '@components/Screen';
import {Text} from '@components/Text';
import {AppTabScreenProps} from '@routes/navigationProps';

export function HomeScreen({navigation}: AppTabScreenProps<'HomeScreen'>) {
  return (
    <Screen>
      <Text
        onPress={() => {
          navigation.navigate('AppTabNavigator', {
            screen: 'FavoriteScreen',
          });
        }}>
        Home screen
      </Text>
    </Screen>
  );
}
