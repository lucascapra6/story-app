import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@screens/auth/LoginScreen';
import {SignUpScreen} from '@screens/auth/SignUpScreen';
import {SuccessScreen} from '@screens/auth/SuccessScreen';
import {ForgotPasswordScreen} from '@screens/auth/ForgotPasswordScreen';
import {IconSvgProps} from '@components/Icon';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
  SuccessScreen: {
    icon: Pick<IconSvgProps, 'name' | 'color'>;
    title: string;
    description: string;
  };
};
export function AuthStack() {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}
