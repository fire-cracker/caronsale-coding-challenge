import { IUser } from '../types/IUsers'

export const userMock: IUser = {
  token: 'token',
  authenticated: true,
  userId: 'peace@gmail.com',
  internalUserId: 1,
  internalUserUUID: 'ce5e3d7f-3a3d-4fde-96bc',
  type: 1,
  privileges: '{PUBLIC_USER}~{SALESMAN_USER}'
}
