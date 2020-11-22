import { injectable, inject } from 'inversify'
import { sha512 } from 'js-sha512'
import axios from 'axios'

import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { IAuthentication } from '../interface/IAuthentication'
import { IUser } from '../../../types/IUsers'
import { ILogger } from '../../Logger/interface/ILogger'
import { userInput, baseUrl } from '../../../fixtures'

@injectable()
export class Authentication implements IAuthentication {

  public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger) {}

  public async authenticate(): Promise<IUser> {
    try {
      this.logger.log(`Authenticating User...`);
      const { userMailId, password, passwordHashCycles } = userInput
      const authUrl: string = `${baseUrl}/v1/authentication`
      const hashedPassword = this.hashPasswordWithCycles(password, passwordHashCycles)
      const { data } = await axios.put(`${authUrl}/${userMailId}`, {
        password: hashedPassword
      })

      return data
    } catch (error) {
      this.logger.log(`User Authentication fails`);
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
