import React from 'react';
import {Screen} from '@components/Screen';
import {Text} from '@components/Text';
import {Button} from '@components/Button';
import {useResetNavigationSuccessScreen} from '@hooks/useResetNavigationSuccessScreen';
import {FormTextInput} from '@components/Form/FormTextInput';
import {useForm} from 'react-hook-form';
import {FormPasswordInput} from '@components/Form/FormPasswordInput';
import {signUpSchema} from '@screens/auth/SignUpScreen/signUpSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {AuthRoutes} from '@routes/navigationProps';

type SignUpScreenFormTypes = {
  username: string;
  fullName: string;
  email: string;
  password: string;
};
export function SignUpScreen({}: AuthRoutes<'SignUpScreen'>) {
  const {reset} = useResetNavigationSuccessScreen();
  const {control, handleSubmit} = useForm<SignUpScreenFormTypes>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      fullName: '',
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
        label="Seu username"
        placeholder="@"
        boxProps={{mb: 's20'}}
      />
      <FormTextInput
        name="fullName"
        control={control}
        label="Nome Completo"
        placeholder="Digite seu nome completo"
        boxProps={{mb: 's20'}}
      />
      <FormTextInput
        name="email"
        control={control}
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mb: 's20'}}
      />
      <FormPasswordInput
        name="password"
        control={control}
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{mb: 's20'}}
      />
      <Button onPress={handleSubmit(submitForm)} title="Criar uma conta" />
    </Screen>
  );
}
