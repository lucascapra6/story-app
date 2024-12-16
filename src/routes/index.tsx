import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from '@routes/StackNavigator/AppStack';
import {AuthStack} from '@routes/StackNavigator/AuthStack';
import { useAuthCredentials } from "@appservices/AuthCredentials/useAuthCredetentials";

export function Routes() {
  const {authCredentials} = useAuthCredentials();

  return (
    <NavigationContainer>
      {authCredentials ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
