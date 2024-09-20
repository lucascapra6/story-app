import React, {useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';
import {useAppTheme} from '../../hooks/useAppTheme';
import {BoxProps, Box} from '../Box';
import {$fontSizes, $fontFamily, Text} from '../Text';

export interface TextInputProps extends RNTextInputProps {
  label: string;
  errorMessage?: string;
  RightComponent?: React.ReactElement;
  boxProps?: BoxProps;
}
export function TextInput({
  label,
  errorMessage,
  RightComponent,
  boxProps,
  ...rnTextInputProps
}: TextInputProps) {
  const {colors, spacing} = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const $boxContainer: BoxProps = {
    flexDirection: 'row',
    borderColor: errorMessage ? 'error' : 'gray4',
    borderWidth: errorMessage ? 2 : 1,
    borderRadius: 's16',
    paddingHorizontal: 's4',
  };
  const $textInputStyle: TextStyle = {
    flexGrow: 1,
    flexShrink: 1,
    padding: spacing.s16,
    ...$fontSizes.paragraphMedium,
  };
  function focusInput() {
    inputRef.current?.focus();
  }
  return (
    <Box {...boxProps}>
      <Pressable onPress={focusInput}>
        <Text preset="paragraphMedium" marginBottom="s4">
          {label}
        </Text>
        <Box {...$boxContainer}>
          <RNTextInput
            ref={inputRef}
            placeholderTextColor={colors.gray2}
            style={$textInputStyle}
            {...rnTextInputProps}
          />
          {RightComponent && (
            <Box justifyContent="center" ml="s16">
              {RightComponent}
            </Box>
          )}
        </Box>
        {errorMessage && (
          <Text color="error" preset="paragraphSmall" bold>
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Box>
  );
}
