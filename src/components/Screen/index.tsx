import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {Box, BoxProps} from '../Box';
import {useAppSafeArea} from '../../hooks/useAppSafeArea';

import {ScrollViewContainer, ViewContainer} from '../ScreenContainer';
import {useAppTheme} from '../../hooks/useAppTheme';

export interface ScreenProps extends BoxProps {
  children: React.ReactNode;
  HeaderComponent?: React.ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  title?: string;
}

export function Screen({
  children,
  scrollable = false,
  style,
  canGoBack = false,
  ...boxProps
}: ScreenProps) {
  const {bottom, top} = useAppSafeArea();
  const {colors} = useAppTheme();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={colors.background} {...boxProps}>
        <Box
          paddingHorizontal="s24"
          paddingBottom="s24"
          style={[{paddingTop: top, paddingBottom: bottom}, style]}>
          {canGoBack && (
            <Box mb="s24" flexDirection="row" alignItems="center">
              <Icon name="arrowLeft" color="primary" />
              <Text preset="paragraphMedium" semiBold ml="s8">
                Voltar
              </Text>
            </Box>
          )}
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
