import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from '@routes/StackNavigator/AppStack';
import {AuthStack} from '@routes/StackNavigator/AuthStack';
export function Routes() {
  const isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
