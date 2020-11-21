/**
 * This service describes an interface for the authentication of client.
 */
export interface IAuthentication {

  authenticate(): Promise<IUser>

}

export interface IUser {
  token: string;
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  type: number;
  privileges: string;
}