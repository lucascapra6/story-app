import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {Box, BoxProps, PressableBox} from '../Box';
import {useAppSafeArea} from '../../hooks/useAppSafeArea';

import {ScrollViewContainer, ViewContainer} from '../ScreenContainer';
import {useAppTheme} from '../../hooks/useAppTheme';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={colors.background} {...boxProps}>
        <Box
          paddingHorizontal="s24"
          paddingBottom="s24"
          style={[{paddingTop: top, paddingBottom: bottom}, style]}>
          {canGoBack && (
            <PressableBox
              onPress={navigation.goBack}
              mb="s24"
              flexDirection="row"
              hitSlop={10}
              width={100}
              alignItems="center">
              <Icon name="arrowLeft" color="primary" />
              <Text preset="paragraphMedium" semiBold ml="s8" bold>
                Voltar
              </Text>
            </PressableBox>
          )}
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
