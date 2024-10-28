import {Toast} from '@appservices/Toast/entities';

export class ToastModel implements Toast {
  message: string;
  type: 'success' | 'error' | undefined;
  duration: number | undefined;
  action:
    | {
        title: string;
        onPress: () => void;
      }
    | undefined;
  constructor({message, type = 'success', duration = 2000, action}: Toast) {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.action = action;
  }
}
