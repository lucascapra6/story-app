import React from 'react';
import {Screen} from '@components/Screen';
import {Button} from '@components/Button';
import {useAuthSignOut} from '@domain/Auth/useCases/useSignOut';

export function SettingsScreen() {
  const {signOut} = useAuthSignOut();
  return (
    <Screen>
      <Button title={'Encerrar sessão'} onPress={signOut} />
    </Screen>
  );
}
