// @ts-ignore
import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {Toast, ToastService} from '@appservices/Toast/entities';

const ToastContext = createContext<ToastService>({
  toast: null,
  showToast: () => {},
  hiddeToast: () => {},
});

export function ToastProvider({children}: PropsWithChildren) {
  const [toast, setToast] = useState<ToastService['toast']>(null);

  function showToast(_toast: Toast) {
    setToast(_toast);
  }

  function hiddeToast() {
    setToast(null);
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ToastContext.Provider value={{toast, showToast, hiddeToast}}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const {toast, showToast, hiddeToast} = useContext(ToastContext);
  return {toast, showToast, hiddeToast};
}
