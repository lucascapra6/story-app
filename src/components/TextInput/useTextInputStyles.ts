import {TextStyle} from 'react-native';
import {$fontSizes} from '@components/Text';
import {BoxProps} from '@components/Box';
import {useAppTheme} from '@hooks/useAppTheme';

export function useTextInputStyles(errorMessage?: string | undefined) {
  const {spacing} = useAppTheme();
  const $textInputStyle: TextStyle = {
    flexGrow: 1,
    flexShrink: 1,
    padding: spacing.s16,
    ...$fontSizes.paragraphMedium,
  };

  const $boxContainer: BoxProps = {
    flexDirection: 'row',
    borderColor: errorMessage ? 'error' : 'gray4',
    borderWidth: errorMessage ? 2 : 1,
    borderRadius: 's16',
    paddingHorizontal: 's4',
  };

  return {
    $textInputStyle,
    $boxContainer,
  };
}
