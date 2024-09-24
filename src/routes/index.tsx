import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from '@routes/AppStack';
import {AuthStack} from '@routes/AuthStack';
export function Routes() {
  const isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
