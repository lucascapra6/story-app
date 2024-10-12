import {useRef} from 'react';
import {Animated} from 'react-native';

export function useStickyHeaderWrapper() {
  const scrollY = useRef(new Animated.Value(0));
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  return {
    scrollY,
    handleScroll,
  };
}
