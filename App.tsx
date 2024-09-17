/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Button} from './src/components/Button';
import {theme} from './src/theme/theme';
import {ActivityIndicator} from './src/components/ActivityIndicator';
function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Button title="Primary" preset="primary" m="s8" disabled />
        <Button title="Outline" preset="outline" m="s8" disabled />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
