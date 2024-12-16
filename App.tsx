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
import {ToastProvider} from '@appservices/Toast/useToastContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { AuthCredentialsProvider } from "@appservices/AuthCredentials/providers/AuthCredentialsProvider";
const queryClient = new QueryClient();
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCredentialsProvider>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <Routes />
              <Toast />
            </ToastProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </AuthCredentialsProvider>
    </QueryClientProvider>
  );
}

export default App;
