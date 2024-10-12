import React from 'react';
import {HomeHeader} from '@components/HomeHeader';
import {Animated, StyleSheet} from 'react-native';
import diffClamp = Animated.diffClamp;

type Props = {
  scrollY: any;
  headerHeight: number;
  children: React.ReactNode;
  enableOpacityEffect?: boolean;
};
export function StickyHeaderWrapper({
  scrollY,
  headerHeight,
  enableOpacityEffect,
  children,
}: Props) {
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  const opacity = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1, 0],
  });

  const headerOpacity = enableOpacityEffect ? opacity : undefined;
  return (
    <Animated.View
      style={[
        style.header,
        {transform: [{translateY}], opacity: headerOpacity},
      ]}>
      {children}
    </Animated.View>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    flex: 1,
  },
  header: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
});
