import React from 'react';
import {Screen} from '../../../components/Screen';
import {Text} from '../../../components/Text';
import {TextInput} from '../../../components/TextInput';
import {Button} from '../../../components/Button';
import {PasswordInput} from '../../../components/PasswordInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';
import {PressableBox} from '../../../components/Box';
import {Controller, useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {FormTextInput} from '../../../components/Form/FormTextInput';
import {FormPasswordInput} from '../../../components/Form/FormPasswordInput';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

type LoginFormType = {
  email: string;
  password: string;
};
export const LoginScreen = ({navigation}: ScreenProps) => {
  function submitForm({email, password}: LoginFormType) {
    Alert.alert(`Email: ${email} ${`\n`} Senha: ${password}`);
  }
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
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

  console.log(errors);
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
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
