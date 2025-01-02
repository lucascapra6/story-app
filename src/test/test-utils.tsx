import React, {ReactElement} from 'react';

import {ThemeProvider} from '@shopify/restyle';
import {
  RenderOptions,
  render,
  RenderHookResult,
  RenderHookOptions,
  renderHook,
} from '@testing-library/react-native';
import {theme} from '@theme/theme';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthCredentialsProvider} from '@appservices/AuthCredentials/providers/AuthCredentialsProvider';
import {Routes} from '@routes/index';
import {Toast} from '@components/Toast';
import {ToastProvider} from '@appservices/Toast/useToastContext';
const queryClientConfig = {
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    //@ts-ignore
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
    mutations: {
      retry: false,
      cacheTime: Infinity,
    },
  },
};
const wrapperAllProviders = () => {
  const queryClient = new QueryClient(queryClientConfig);

  return ({children}: {children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const wrappScreenProviders = () => {
  const queryClient = new QueryClient(queryClientConfig);

  return ({children}: {children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>
      <AuthCredentialsProvider>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <NavigationContainer>{children}</NavigationContainer>
            <Toast />
          </ToastProvider>
        </ThemeProvider>
      </AuthCredentialsProvider>
    </QueryClientProvider>
  );
};
function customRender<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, {wrapper: wrapperAllProviders(), ...options});
}

export function renderScreen<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, {wrapper: wrappScreenProviders(), ...options});
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: RenderHookOptions<Props>,
): RenderHookResult<Result, Props> {
  return renderHook(renderCallback, {
    ...options,
    wrapper: wrapperAllProviders(),
  });
}

export * from '@testing-library/react-native';
export {customRender as render};
export {customRenderHook as renderHook};
