import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from '../../../components/Button';
import {Screen} from '../../../components/Screen';
import {Text} from '../../../components/Text';
import {TextInput} from '../../../components/TextInput';
import {RootStackParamList} from '../../../routes';
import {useResetNavigationSuccessScreen} from '../../../hooks/useResetNavigationSuccessScreen';
type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPasswordScreen'
>;
export function ForgotPasswordScreen({}: ScreenProps) {
  const {reset} = useResetNavigationSuccessScreen();
  function submitForm() {
    reset({
      title: `Enviamos as instruções para seu  ${'\n'}e-mail`,
      description:
        'Clique no link enviado no seu e-mail para recuperar sua senha',
      icon: {
        name: 'messageRound',
        color: 'primary',
      },
    });
  }
  return (
    <Screen canGoBack>
      <Text preset="headingLarge" mb="s16">
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge" mb="s32">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>
      <TextInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mb: 's40'}}
      />
      <Button onPress={submitForm} title="Recuperar senha" />
    </Screen>
  );
}
