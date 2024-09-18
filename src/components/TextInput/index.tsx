import React, {useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {Box, BoxProps} from '../Box';
import {$fontSizes, Text} from '../Text';
import {useAppTheme} from '../../hooks/useAppTheme';

type Props = {
  label?: string;
  renderRightComponent?: React.ReactElement;
  errorMessage?: string;
  boxProps?: BoxProps;
  placeholder?: string;
} & TextInputProps;
export function TextInput({
  label,
  renderRightComponent,
  errorMessage,
  boxProps,
  placeholder,
  ...textInputProps
}: Props) {
  const {colors} = useAppTheme();
  const textInputRef = useRef<RNTextInput>(null);
  const $textInputContainer: BoxProps = {
    borderWidth: errorMessage ? 2 : 1,
    padding: 's16',
    flexDirection: 'row',
    borderRadius: 's12',
    borderColor: errorMessage ? 'redError' : 'gray3',
  };

  const $textInput: TextStyle = {
    flexGrow: 1,
    flexShrink: 1,
    padding: 0,
    color: colors.grayBlack,
    ...$fontSizes.paragraphMedium,
  };
  return (
    <Box m="s8" {...boxProps}>
      <Pressable
        onPress={() => {
          textInputRef.current?.focus();
        }}>
        {label && <Text mb="s4">{label}</Text>}
        <Box {...$textInputContainer}>
          <RNTextInput
            ref={textInputRef}
            {...textInputProps}
            style={{...$textInput}}
            placeholder={placeholder}
            placeholderTextColor={colors.gray2}
          />
          <Box ml="s4" justifyContent="center">
            {renderRightComponent}
          </Box>
        </Box>
        {errorMessage && (
          <Text mt="s4" color="error">
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Box>
  );
}
