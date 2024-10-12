import React from 'react';
import {Box, BoxProps} from '@components/Box';
import {Icon} from '@components/Icon';
import {useAppSafeArea} from '@hooks/useAppSafeArea';
import {Text} from '@components/Text';
export function HomeHeader() {
  const $wrapper: BoxProps = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 's24',
    paddingHorizontal: 's24',
    backgroundColor: 'background',
  };

  const {top} = useAppSafeArea();
  return (
    <Box {...$wrapper} style={{paddingTop: top}}>
      <Text bold preset="paragraphLarge" color="backgroundContrast">
        StoryApp
      </Text>
      <Box flexDirection="row" gap="s24">
        <Box>
          <Icon name="search" />
        </Box>
        <Box>
          <Icon name="bell" />
        </Box>
        <Icon name="comment" />
      </Box>
    </Box>
  );
}
