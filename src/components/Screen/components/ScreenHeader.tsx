import React from 'react';
import {Box, PressableBox} from '@components/Box';
import {Icon} from '@components/Icon';
import {Text} from '@components/Text';
import {useNavigation} from '@react-navigation/native';

type Props = {
  canGoBack?: boolean;
  title?: string;
};
export function ScreenHeader({canGoBack = false, title}: Props) {
  const navigation = useNavigation();
  return (
    <Box justifyContent="space-between" flexDirection="row">
      {canGoBack && (
        <PressableBox
          onPress={navigation.goBack}
          mb="s24"
          flexDirection="row"
          hitSlop={10}
          alignItems="center">
          <Icon name="arrowLeft" color="primary" />
          {!title && (
            <Text preset="paragraphMedium" semiBold ml="s8" bold>
              Voltar
            </Text>
          )}
        </PressableBox>
      )}
      {title && (
        <Text preset="paragraphMedium" semiBold ml="s8" bold>
          {title}
        </Text>
      )}
      {title && <Box width={20} />}
    </Box>
  );
}
