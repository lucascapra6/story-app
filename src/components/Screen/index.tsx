import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Box, BoxProps} from '../Box';
import {useAppSafeArea} from '@hooks/useAppSafeArea';

import {ScrollViewContainer, ViewContainer} from '../ScreenContainer';
import {useAppTheme} from '@hooks/useAppTheme';
import {ScreenHeader} from '@components/Screen/components/ScreenHeader';

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
  title,
  ...boxProps
}: ScreenProps) {
  const {bottom, top} = useAppSafeArea();
  const {colors} = useAppTheme();
  const Container = scrollable ? ScrollViewContainer : ViewContainer;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={colors.background} {...boxProps}>
        <Box
          paddingHorizontal="s24"
          style={[{paddingTop: top, paddingBottom: bottom}, style]}>
          <ScreenHeader canGoBack={canGoBack} title={title} />
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
