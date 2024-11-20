import {Toast, ToastPosition, ToastType} from '@appservices/Toast/types';
import {position} from '@shopify/restyle';

export class ToastModel implements Toast {
  message: string;
  type: ToastType;
  duration: number | undefined;
  action:
    | {
        title: string;
        onPress: () => void;
      }
    | undefined;
  position: ToastPosition;
  constructor({
    message,
    type = 'success',
    duration = 2000,
    action,
    position,
  }: Toast) {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.action = action;
    this.position = position;
  }
}
