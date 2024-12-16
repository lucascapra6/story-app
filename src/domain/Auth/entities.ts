import {User} from '@domain/User/entities';
import {UserAPI} from '@domain/User/entities';
export interface AuthCredentials {
  token: string;
  user: User;
  tokenExpiresAt: string;
  refreshToken: string;
}
export interface AuthCredentialsAPI {
  auth: {
    type: string; //'bearer';
    token: string; // 'NA.GCfDf81QRs0q4VxyFSEvWs8kZ-DoZnl5zKLn8UDY8ntedjZCPgxVxfFijlQy';
    refreshToken: string;
    expires_at: string;
  };
  user: UserAPI;
}
export interface SignInData {
  username?: string;
  email?: string;
  password: string;
}
