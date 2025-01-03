import React from 'react';
import {useToast, useToastService} from '@appservices/Toast/useToast';
import {useCallback, useEffect, useRef} from 'react';
import {ToastContent} from '@components/ToastContent';
import {Animated} from 'react-native';
import {ToastPosition} from '@appservices/Toast/types';

const DEFAULT_DURATION = 2000;
export function Toast() {
  const toast = useToast();
  const {hideToast} = useToastService();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const position: ToastPosition = toast?.position || 'top';
  const runEnteringAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const runExitingAnimation = useCallback(
    (callback: Animated.EndCallback) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(callback);
    },
    [fadeAnim],
  );

  useEffect(() => {
    if (toast) {
      runEnteringAnimation();
      setTimeout(() => {
        runExitingAnimation(hideToast);
      }, toast.duration || DEFAULT_DURATION);
    }
  }, [toast, hideToast, runEnteringAnimation, runExitingAnimation]);

  if (!toast) {
    return null;
  }

  return (
    <Animated.View
      testID="toast-message"
      style={{
        position: 'absolute',
        alignSelf: 'center',
        opacity: fadeAnim,
        [position]: 200,
      }}>
      <ToastContent toast={toast} />
    </Animated.View>
  );
}
