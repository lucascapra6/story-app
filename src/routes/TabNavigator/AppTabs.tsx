import React from 'react';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Box} from '@components/Box';
import {TouchableOpacityBox} from '@components/TouchableOpacityBox';
import {Text} from '@components/Text';
import {Icon} from '@components/Icon';
import {AppTabBottomTabParamList} from '@routes/TabNavigator/AppTabNavigator';

import {mapAppTab} from '@routes/TabNavigator/mapAppTab';
import {$shadow} from '@theme/theme';
import {useAppSafeArea} from '@hooks/useAppSafeArea';

export function AppTabs({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <Box flexDirection="row" style={$shadow}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const bottomTabData =
          mapAppTab[route.name as keyof AppTabBottomTabParamList];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacityBox
            flex={1}
            activeOpacity={1}
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            alignItems="center"
            paddingTop={'s12'}
            paddingBottom={'s16'}
            justifyContent="center">
            <Icon
              name={
                isFocused
                  ? bottomTabData.icon.focused
                  : bottomTabData.icon.unfocused
              }
              color={isFocused ? 'primary' : 'backgroundContrast'}
            />
            <Text style={{color: isFocused ? '#673ab7' : '#222'}} mt="s4">
              {bottomTabData.label}
            </Text>
          </TouchableOpacityBox>
        );
      })}
    </Box>
  );
}
