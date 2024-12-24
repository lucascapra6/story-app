import React from 'react';
import {
  TouchableOpacityBoxProps,
  TouchableOpacityBox,
} from '@components/TouchableOpacityBox';
import {Text} from '@components/Text';
import {ActivityIndicator} from '@components/ActivityIndicator';
import {buttonPresets, Presets} from '@components/Button/buttonPresets';

export type ButtonProps = {
  preset?: Presets;
  title: string;
  loading?: boolean;
  disabled?: boolean;
} & TouchableOpacityBoxProps;

export const Button = ({
  preset = 'primary',
  title,
  loading,
  disabled,
  ...touchableOpacityBoxProps
}: ButtonProps) => {
  const buttonStyle = buttonPresets[preset][disabled ? 'disabled' : 'default'];
  return (
    <TouchableOpacityBox
      backgroundColor="primary"
      height={50}
      borderRadius="s16"
      justifyContent={'center'}
      alignItems={'center'}
      disabled={disabled}
      {...buttonStyle.container}
      {...touchableOpacityBoxProps}>
      {loading ? (
        <ActivityIndicator color={buttonStyle.content} />
      ) : (
        <Text preset="paragraphMedium" bold color={buttonStyle.content}>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
};
