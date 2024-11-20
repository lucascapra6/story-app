import {userAdapter} from '@domain/User/userAdapter';
import {AuthCredentials, AuthCredentialsAPI} from '@domain/Auth/entities';

function toAuthCredentials(
  authCredentialsAPI: AuthCredentialsAPI,
): AuthCredentials {
  return {
    token: authCredentialsAPI.auth.token,
    user: userAdapter.toUser(authCredentialsAPI.user),
  };
}
export const authAdapter = {toAuthCredentials};
