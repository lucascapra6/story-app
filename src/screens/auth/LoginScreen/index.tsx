import React from 'react';
import {Screen} from '@components/Screen';
import {Text} from '@components/Text';
import {Button} from '@components/Button';
import {PressableBox} from '@components/Box';
import {useForm} from 'react-hook-form';
import {FormTextInput} from '@components/Form/FormTextInput';
import {FormPasswordInput} from '@components/Form/FormPasswordInput';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema, LoginSchema} from '@screens/auth/LoginScreen/loginSchema';
import {AuthRoutes} from '@routes/navigationProps';
import {useAuthSignIn} from '@domain/Auth/useCases/useSignIn';
import {useToastService} from '@appservices/Toast/useToast';
import {ToastModel} from '@appservices/Toast/model';

type LoginFormType = {
  email: string;
  password: string;
};
export const LoginScreen = ({navigation}: AuthRoutes<'LoginScreen'>) => {
  const {signIn, isLoading} = useAuthSignIn({onError: onSignInError});
  const {showToast} = useToastService();
  function onSignInError(errorMessage: string) {
    console.log(errorMessage);
    showToast(
      new ToastModel({
        message: errorMessage,
        position: 'bottom',
        type: 'error',
      }),
    );
  }
  function submitForm({email, password}: LoginSchema) {
    signIn({email, password});
  }
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
  function navigateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
  }
  function navigateToForgotPasswordScreen() {
    navigation.navigate('ForgotPasswordScreen');
  }

  return (
    <Screen flex={1} justifyContent="center" scrollable>
      <Text marginBottom="s8" preset="headingLarge">
        Olá
      </Text>
      <Text preset="paragraphLarge" mb="s40">
        Digite seu e-mail e senha para entrar
      </Text>

      <FormTextInput
        control={control}
        rules={{
          required: 'E-mail obrigatório',
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'E-mail inválido',
          },
        }}
        name="email"
        label="E-mail"
      />
      <FormPasswordInput
        control={control}
        rules={{
          required: 'Campo obrigatório',
        }}
        name="password"
        label="Senha"
      />

      <PressableBox
        hitSlop={10}
        alignSelf="flex-start"
        mt="s8"
        onPress={navigateToForgotPasswordScreen}>
        <Text preset="paragraphSmall" bold color="primary">
          Esqueci minha senha
        </Text>
      </PressableBox>

      <Button
        preset="primary"
        marginTop="s48"
        title="Entrar"
        disabled={!isValid}
        loading={isLoading}
        onPress={handleSubmit(submitForm)}
      />
      <Button
        preset="outline"
        marginTop="s12"
        title="Criar uma conta"
        onPress={navigateToSignUpScreen}
      />
    </Screen>
  );
};
