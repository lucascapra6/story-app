import React from 'react';
import {Screen} from '../../../components/Screen';
import {Text} from '../../../components/Text';
import {Button} from '../../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';
import {useResetNavigationSuccessScreen} from '../../../hooks/useResetNavigationSuccessScreen';
import {FormTextInput} from '../../../components/Form/FormTextInput';
import {useForm} from 'react-hook-form';
import {FormPasswordInput} from '../../../components/Form/FormPasswordInput';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

type SignUpScreenFormTypes = {
  username: string;
  name: string;
  email: string;
  password: string;
};
export function SignUpScreen({}: ScreenProps) {
  const {reset} = useResetNavigationSuccessScreen();
  const {control, handleSubmit} = useForm<SignUpScreenFormTypes>({
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
  function submitForm() {
    reset({
      icon: {
        name: 'checkRound',
        color: 'success',
      },
      title: 'Sua conta foi criada com sucesso!',
      description: 'Agora é só fazer login na nossa plataforma',
    });
  }
  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s32">
        Criar uma conta
      </Text>
      <FormTextInput
        name="username"
        control={control}
        rules={{required: 'Campo obrigatório'}}
        label="Seu username"
        placeholder="@"
        boxProps={{mb: 's20'}}
      />
      <FormTextInput
        name="name"
        control={control}
        rules={{required: 'Campo obrigatório'}}
        label="Nome Completo"
        placeholder="Digite seu nome completo"
        boxProps={{mb: 's20'}}
      />
      <FormTextInput
        name="email"
        control={control}
        rules={{required: 'Campo obrigatório'}}
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mb: 's20'}}
      />
      <FormPasswordInput
        name="password"
        control={control}
        rules={{required: 'Campo obrigatório'}}
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{mb: 's20'}}
      />
      <Button onPress={handleSubmit(submitForm)} title="Criar uma conta" />
    </Screen>
  );
}
