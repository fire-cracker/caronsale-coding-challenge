import { IUser } from '../../../types/IUsers'

/**
 * This service describes an interface for the authentication of client.
 */
export interface IAuthentication {

  authenticate(): Promise<IUser>

}
