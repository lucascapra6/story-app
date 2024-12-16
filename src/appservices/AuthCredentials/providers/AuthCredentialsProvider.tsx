import {AuthCredentialsService} from '@appservices/AuthCredentials/IAuthCredentialsServices';
import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import {AuthCredentials} from '@domain/Auth/entities';
import {authService} from '@domain/Auth/authService';
import {authCredentialsStorage} from '@appservices/AuthCredentials/authCredentialsStorage';
import {api, registerInterceptor} from '@api/apiConfig';
import {authApi} from '@domain/Auth/authApi';

export const AuthCredentialsContext = createContext<AuthCredentialsService>({
  authCredentials: null,
  isLoading: false,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
});

export function AuthCredentialsProvider({children}: PropsWithChildren) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null);
  const [isLoading, setLoading] = useState(false);
  async function removeCredentials() {
    authService.removeToken();
    authCredentialsStorage.remove();
    setAuthCredentials(null);
  }
  async function saveCredentials(ac: AuthCredentials) {
    authService.updateToken(ac.token);
    authCredentialsStorage.set(ac);
    setAuthCredentials(ac);
  }

  async function startAuthCredentials() {
    try {
      // await new Promise(resolve => setTimeout(resolve, 2000, ''));
      const ac = await authCredentialsStorage.get();
      if (ac) {
        authService.updateToken(ac.token);
        setAuthCredentials(ac);
      }
    } catch (error) {
      // TODO: handle error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    startAuthCredentials();
  }, []);

  useEffect(() => {
    const interceptor = registerInterceptor({
      authCredentials,
      saveCredentials,
      removeCredentials,
    });

    return interceptor;
  }, [authCredentials]);

  return (
    <AuthCredentialsContext.Provider
      value={{authCredentials, isLoading, removeCredentials, saveCredentials}}>
      {children}
    </AuthCredentialsContext.Provider>
  );
}
