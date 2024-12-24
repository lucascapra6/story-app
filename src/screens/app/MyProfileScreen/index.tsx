import {Screen} from '@components/Screen';
import {Text} from '@components/Text';
import React from 'react';

import {Box} from '@components/Box';
import {Icon} from '@components/Icon';
import {AppTabScreenProps} from '@routes/navigationProps';
import {useAuthCredentials} from '@appservices/AuthCredentials/useAuthCredetentials';

export function MyProfileScreen({
  navigation,
}: AppTabScreenProps<'MyProfileScreen'>) {
  const {authCredentials} = useAuthCredentials();
  const name = authCredentials?.user.fullName;
  return (
    <Screen>
      <Text>Profile</Text>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        {name && <Text preset="headingMedium">{name}</Text>}
        <Icon
          name="settings"
          onPress={() => navigation.navigate('SettingsScreen')}
        />
      </Box>
    </Screen>
  );
}
