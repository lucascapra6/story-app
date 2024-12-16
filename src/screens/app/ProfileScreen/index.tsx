import React from 'react';
import {useUserGetById} from '@domain/User/useCases/useUserGetById';
import {Screen} from '@components/Screen';
import {ActivityIndicator} from '@components/ActivityIndicator';
import {Text} from '@components/Text';
import {Box} from '@components/Box';
import {ProfileAvatar} from '@components/ProfileAvatar';
import {AppRoutes} from '@routes/navigationProps';
export function ProfileScreen({route}: AppRoutes<'ProfileScreen'>) {
  const userId = route.params.userId;

  const {isLoading, isError, user} = useUserGetById(userId);
  console.log(user);

  return (
    <Screen canGoBack>
      {isLoading && <ActivityIndicator />}
      {isError && <Text> error ao carregar perfil do usuário</Text>}
      {user && (
        <Box alignItems="center">
          <ProfileAvatar
            imageURL={user.profileUrl}
            size={64}
            borderRadius={24}
          />
          <Text preset="headingMedium" bold>
            {user.fullName}
          </Text>
          <Text>@{user.username}</Text>
        </Box>
      )}
    </Screen>
  );
}
