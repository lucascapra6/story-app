import {authApi} from './authApi';
import {authAdapter} from '@domain/Auth/authAdapter';
import {AuthCredentials} from '@domain/Auth/entities';
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
export const authService = {
  signIn,
  signOut,
};
