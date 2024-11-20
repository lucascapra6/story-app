import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {Toast, ToastService} from '@appservices/Toast/types';

const ToastContext = createContext<ToastService>({
  toast: null,
  showToast: () => {},
  hideToast: () => {},
});

export function ToastProvider({children}: PropsWithChildren) {
  const [toast, setToast] = useState<ToastService['toast']>(null);

  function showToast(_toast: Toast) {
    setToast(_toast);
  }

  function hideToast() {
    setToast(null);
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ToastContext.Provider value={{toast, showToast, hideToast}}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const {toast} = useContext(ToastContext);
  return toast;
}

export function useToastContextService() {
  const {showToast, hideToast} = useContext(ToastContext);
  return {showToast, hideToast};
}
