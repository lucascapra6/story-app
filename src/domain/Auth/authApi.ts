import {api} from '@api/apiConfig';
import {AuthCredentialsAPI} from '@domain/Auth/entities';
import {AxiosRequestConfig} from 'axios';
const REFRESH_TOKEN_URL = 'auth/refresh-token';
async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialsAPI> {
  const response = await api.post<AuthCredentialsAPI>('auth/login', {
    email,
    password,
  });
  return response.data;
}
async function signOut(): Promise<string> {
  const response = await api.get<string>('auth/profile/logout');
  return response.data;
}

async function refreshToken(token: string): Promise<AuthCredentialsAPI> {
  const response = await api.post<AuthCredentialsAPI>(REFRESH_TOKEN_URL, {
    refreshToken: token,
  });

  return response.data;
}

function isRefreshTokenRequest(request: AxiosRequestConfig): boolean {
  return request.url === REFRESH_TOKEN_URL;
}
export const authApi = {
  signIn,
  signOut,
  refreshToken,
  isRefreshTokenRequest,
};
