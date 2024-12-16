import {authApi} from './authApi';
import {authAdapter} from '@domain/Auth/authAdapter';
import {AuthCredentials} from '@domain/Auth/entities';
import {api} from '@api/apiConfig';
async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentials> {
  try {
    const authCredentialsAPI = await authApi.signIn(email, password);
    return authAdapter.toAuthCredentials(authCredentialsAPI);
  } catch (error) {
    throw new Error('email ou senha inválido');
  }
}
async function signOut(): Promise<string> {
  const message = await authApi.signOut();
  return message;
}

function updateToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
function removeToken() {
  api.defaults.headers.common.Authorization = null;
}

async function authenticateByRefreshToken(
  refreshToken: string,
): Promise<AuthCredentials> {
  const acAPI = await authApi.refreshToken(refreshToken);
  return authAdapter.toAuthCredentials(acAPI);
}
export const authService = {
  signIn,
  signOut,
  updateToken,
  removeToken,
  authenticateByRefreshToken,
};
