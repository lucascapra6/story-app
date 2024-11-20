import {
  useToastServiceZustand,
  useToastZustand,
} from '@appservices/Toast/useToastZustand';

export function useToast() {
  // return useToastContext();
  return useToastZustand();
}

export function useToastService() {
  // const {hideToast, showToast} = useToastContextService();
  const {hideToast, showToast} = useToastServiceZustand();
  return {hideToast, showToast};
}
