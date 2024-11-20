import {User} from '@domain/User/entities';
import {UserAPI} from '@domain/User/entities';
export interface AuthCredentials {
  token: string;
  user: User;
}
export interface AuthCredentialsAPI {
  auth: {
    type: string; //'bearer';
    token: string; // 'NA.GCfDf81QRs0q4VxyFSEvWs8kZ-DoZnl5zKLn8UDY8ntedjZCPgxVxfFijlQy';
  };
  user: UserAPI;
}
export interface SignInData {
  username?: string;
  email?: string;
  password: string;
}
