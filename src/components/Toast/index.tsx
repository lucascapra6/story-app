import {Box, BoxProps} from '@components/Box';
import {Dimensions} from 'react-native';
import {Icon} from '@components/Icon';
import {Text} from '@components/Text';
import {$shadowProps} from '@theme/theme';
import {useToast} from '@appservices/Toast/useToast';
import {useEffect} from 'react';

const MAX_WIDTH = Dimensions.get('screen').width * 0.9;

export function Toast() {
  const {toast, hiddeToast} = useToast();

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        hiddeToast();
      }, toast.duration);
    }
  }, [toast, hiddeToast]);

  if (!toast) return null;

  return (
    <Box top={100} {...$boxStyle}>
      <Icon color="success" name="checkRound" />
      <Text style={{flexShrink: 1}} ml="s16" preset="paragraphMedium" bold>
        {toast?.message}
      </Text>
    </Box>
  );
}

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
  style: {...$shadowProps},
};
