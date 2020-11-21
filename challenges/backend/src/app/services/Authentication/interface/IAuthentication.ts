/**
 * This service describes an interface for the authentication of client.
 */
export interface IAuthentication {

  authenticate(): Promise<any /* TODO: Introduce a type */>

}

export interface IAuthenticationResponse {
  token: string;
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  type: number;
  privileges: string;
}