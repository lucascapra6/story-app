import {TouchableOpacityBoxProps} from '../TouchableOpacityBox';
import {ThemeColors} from '../../theme/theme';

export type Presets = 'primary' | 'outline';

export interface ButtonUI {
  container: TouchableOpacityBoxProps;
  content: ThemeColors;
}

export const buttonPresets: Record<
  Presets,
  {default: ButtonUI; disabled: ButtonUI}
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: 'primaryContrast',
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: 'gray2',
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
        backgroundColor: 'grayWhite',
      },
      content: 'primary',
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray4',
        backgroundColor: 'grayWhite',
      },
      content: 'gray2',
    },
  },
};
