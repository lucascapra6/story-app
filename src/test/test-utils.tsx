import React, {ReactElement} from 'react';

import {ThemeProvider} from '@shopify/restyle';
import {RenderOptions, render} from '@testing-library/react-native';
import {theme} from '@theme/theme';
import {NavigationContainer} from '@react-navigation/native';

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  );
};

function customRender<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, {wrapper: AllTheProviders, ...options});
}

export * from '@testing-library/react-native';
export {customRender as render};
