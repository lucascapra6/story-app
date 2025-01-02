import axios from 'axios';
import {AuthCredentials} from '@domain/Auth/entities';
import {authApi} from '@domain/Auth/authApi';
import {authService} from '@domain/Auth/authService';

export const BASE_URL = 'http://127.0.0.1:3333/';
export const api = axios.create({
  baseURL: BASE_URL,
});

type InterceptorProps = {
  authCredentials: AuthCredentials | null;
  saveCredentials: (ac: AuthCredentials) => Promise<void>;
  removeCredentials: () => Promise<void>;
};
export function registerInterceptor({
  authCredentials,
  saveCredentials,
  removeCredentials,
}: InterceptorProps) {
  const interceptor = api.interceptors.response.use(
    response => response,
    async responseError => {
      const failedRequest = responseError.config;
      if (responseError.response.status === 401) {
        if (
          !authCredentials?.refreshToken ||
          authApi.isRefreshTokenRequest(failedRequest) ||
          failedRequest.sent
        ) {
          removeCredentials();
          return Promise.reject(responseError);
        }
        failedRequest.sent = true;
        const newAuthCredentials = await authService.authenticateByRefreshToken(
          authCredentials?.refreshToken,
        );

        saveCredentials(newAuthCredentials);

        failedRequest.headers.Authorization = `Bearer ${newAuthCredentials.token}`;

        return api(failedRequest);
      }
      return Promise.reject(responseError);
    },
  );
  return () => api.interceptors.response.eject(interceptor);
}
