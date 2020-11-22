export interface IUser {
    token: string
    authenticated: boolean
    userId: string
    internalUserId: number
    internalUserUUID: string
    type: number
    privileges: string
}
