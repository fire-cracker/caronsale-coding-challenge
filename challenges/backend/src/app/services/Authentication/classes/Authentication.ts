import { injectable, inject } from 'inversify'
import { sha512 } from 'js-sha512'
import axios from 'axios'

import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { IAuthentication, IAuthenticationResponse } from '../interface/IAuthentication'
import { ILogger } from '../../Logger/interface/ILogger'
import { IConfig } from '../../../helpers/types'
import config from '../../../helpers/config'

@injectable()
export class Authentication implements IAuthentication {
  private baseUrl: IConfig['baseUrl']
  private userMailId: IConfig['userMailId']
  private password: IConfig['password']
  private passwordHashCycles: IConfig['passwordHashCycles']
  private authUrl: string = '/v1/authentication'

  public constructor() {
    const { baseUrl, userMailId, password, passwordHashCycles } = config
    Object.assign(this, { baseUrl, userMailId, password, passwordHashCycles })
  }

  public async authenticate(): Promise<IAuthenticationResponse> {
    try {
      const { baseUrl, authUrl, userMailId, password, passwordHashCycles } = this
      const hashedPassword = this.hashPasswordWithCycles(password, passwordHashCycles)
      // this.logger.log(`${baseUrl}${authUrl}/${userMailId}, password>>>> ${hashedPassword}`)
      const { data } = await axios.put(`${this.baseUrl}${this.authUrl}/${this.userMailId}`, {
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
