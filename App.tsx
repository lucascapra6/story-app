/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {theme} from '@theme/theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Routes} from './src/routes';
import {Toast} from '@components/Toast';
import {ToastProvider} from '@appservices/Toast/useToast';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Routes />
          <Toast />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
