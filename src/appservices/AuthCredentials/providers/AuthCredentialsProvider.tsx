import React from 'react';
import {AuthCredentialsService} from '@appservices/AuthCredentials/IAuthCredentialsServices';
import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import {AuthCredentials} from '@domain/Auth/entities';
import {authService} from '@domain/Auth/authService';
import {authCredentialsStorage} from '@appservices/AuthCredentials/authCredentialsStorage';
import {registerInterceptor} from '@api/apiConfig';

export const AuthCredentialsContext = createContext<AuthCredentialsService>({
  authCredentials: null,
  userId: null,
  isLoading: false,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
});

export function AuthCredentialsProvider({children}: PropsWithChildren) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null);
  const [isLoading, setLoading] = useState(false);
  const userId = authCredentials?.user.id || null;
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
      value={{
        authCredentials,
        userId,
        isLoading,
        removeCredentials,
        saveCredentials,
      }}>
      {children}
    </AuthCredentialsContext.Provider>
  );
}
