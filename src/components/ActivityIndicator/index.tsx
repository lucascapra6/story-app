import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from 'react-native';
import {ThemeColors} from '@theme/theme';
import {useAppTheme} from '@hooks/useAppTheme';

type ActivityIndicatorProps = {
  color?: ThemeColors;
} & Omit<RNActivityIndicatorProps, 'color'>;
export function ActivityIndicator({color = 'primary'}: ActivityIndicatorProps) {
  const {colors} = useAppTheme();
  return <RNActivityIndicator color={colors[color]} />;
}
