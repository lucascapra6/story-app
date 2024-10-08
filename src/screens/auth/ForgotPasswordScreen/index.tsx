import React from 'react';
import {Button} from '@components/Button';
import {Screen} from '@components/Screen';
import {Text} from '@components/Text';
import {useResetNavigationSuccessScreen} from '@hooks/useResetNavigationSuccessScreen';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {forgotPasswordSchema} from './forgotPasswordScreen';
import {FormTextInput} from '@components/Form/FormTextInput';
import {AuthRoutes} from '@routes/navigationProps';

type ForgotPasswordForm = {
  email: string;
};
export function ForgotPasswordScreen({}: AuthRoutes<'ForgotPasswordScreen'>) {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });
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
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s16">
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge" mb="s32">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>
      <FormTextInput
        name="email"
        control={control}
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mb: 's40'}}
      />
      <Button
        onPress={handleSubmit(submitForm)}
        title="Recuperar senha"
        disabled={!isValid}
      />
    </Screen>
  );
}
