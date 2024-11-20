import {Toast, ToastPosition, ToastType} from '@appservices/Toast/types';
import {Dimensions} from 'react-native';
import {$shadowProps} from '@theme/theme';
import {Box, BoxProps} from '@components/Box';
import {Icon} from '@components/Icon';
import {Text} from '@components/Text';
import {IconSvgProps} from '@components/Icon';
const MAX_WIDTH = Dimensions.get('screen').width * 0.9;

interface Props {
  toast: Toast;
}
export function ToastContent({toast}: Props) {
  const type: ToastType = toast?.type || 'success';
  return (
    <Box {...$boxStyle} style={[$shadowProps]}>
      <Icon {...mapTypeToIcon[type]} />
      <Text style={{flexShrink: 1}} ml="s16" preset="paragraphMedium" bold>
        {toast?.message}
      </Text>
    </Box>
  );
}

const mapTypeToIcon: Record<ToastType, IconSvgProps> = {
  success: {
    color: 'success',
    name: 'checkRound',
  },
  error: {
    color: 'error',
    name: 'errorRound',
  },
};

const $boxStyle: BoxProps = {
  position: 'absolute',
  backgroundColor: 'background',
  alignSelf: 'center',
  alignItems: 'center',
  padding: 's16',
  borderRadius: 's16',
  flexDirection: 'row',
  opacity: 0.95,
  maxWidth: MAX_WIDTH,
};
