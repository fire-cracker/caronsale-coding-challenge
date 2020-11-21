import { injectable, inject } from 'inversify'
import { sha512 } from 'js-sha512'
import axios from 'axios'

import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { IAuthentication, IUser } from '../interface/IAuthentication'
import { ILogger } from '../../Logger/interface/ILogger'
import { IConfig } from '../../../helpers/types'
import config from '../../../helpers/config'

@injectable()
export class Authentication implements IAuthentication {

  public constructor() {
    const { baseUrl, userMailId, password, passwordHashCycles } = config
    Object.assign(this, { baseUrl, userMailId, password, passwordHashCycles })
  }

  private baseUrl: IConfig['baseUrl']
  private userMailId: IConfig['userMailId']
  private password: IConfig['password']
  private passwordHashCycles: IConfig['passwordHashCycles']

  public async authenticate(): Promise<IUser> {
    try {
      const { baseUrl, userMailId, password, passwordHashCycles } = this
      const authUrl: string = `${baseUrl}/v1/authentication`
      const hashedPassword = this.hashPasswordWithCycles(password, passwordHashCycles)
      const { data } = await axios.put(`${authUrl}/${userMailId}`, {
        password: hashedPassword
      })

      return data
    } catch (error) {
      throw error
    }
  }

  private hashPasswordWithCycles(plainTextPassword: string, cycles: number): string {
    let hash = `${plainTextPassword}`
    for (let i = 0; i < cycles; i++) {
      hash = sha512(hash)
    }

    return hash
  }
}
