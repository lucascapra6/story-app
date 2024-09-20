import React from 'react';
import {Screen} from '../../../components/Screen';
import {Text} from '../../../components/Text';
import {TextInput} from '../../../components/TextInput';
import {Button} from '../../../components/Button';
import {Icon} from '../../../components/Icon';
import {PasswordInput} from '../../../components/PasswordInput';

export function SignUpScreen() {
  function submitForm() {
    // TODO: implementar
  }
  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s32">
        Criar uma conta
      </Text>
      <TextInput label="Seu username" placeholder="@" boxProps={{mb: 's20'}} />
      <TextInput
        label="Nome Completo"
        placeholder="Digite seu nome completo"
        boxProps={{mb: 's20'}}
      />
      <TextInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mb: 's20'}}
      />
      <PasswordInput
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{mb: 's20'}}
      />
      <Button onPress={submitForm} title="Criar uma conta" />
    </Screen>
  );
}
