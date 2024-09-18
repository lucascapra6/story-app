/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from './src/components/Button';
import {theme} from './src/theme/theme';
import {Icon} from './src/components/Icon';
import {TextInput} from './src/components/TextInput';
function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Button title="Primary" preset="primary" m="s8" disabled />
        <Button title="Outline" preset="outline" m="s8" disabled />
        <Icon name={'eyeOn'} size={50} />
        <Icon name={'eyeOff'} />
        <TextInput
          label="Email"
          renderRightComponent={<Icon name={'eyeOn'} />}
        />
        <TextInput
          label="Senha"
          errorMessage={'senha invalida'}
          placeholder={'senha'}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
