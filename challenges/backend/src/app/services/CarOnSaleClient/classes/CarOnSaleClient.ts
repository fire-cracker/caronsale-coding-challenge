import { injectable, inject } from 'inversify'
import axios from 'axios'

import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { ICarOnSaleClient } from '../interface/ICarOnSaleClient'
import { IAuctions } from '../../../types/IAuctions'
import { ILogger } from '../../Logger/interface/ILogger'
import { IAuthentication } from '../../Authentication/interface/IAuthentication'
import { baseUrl } from '../../../fixtures'

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.AUTHENTICATION) private authentication: IAuthentication
  ) {}

  public async getRunningAuctions(): Promise<IAuctions> {
    try {
      this.logger.log(`Fetching Running Auctions...`)
      const { userId, token } = await this.authentication.authenticate()
      const { data } = await axios.get(`${baseUrl}/v2/auction/buyer/`, {
        headers: { userId, authToken: token }
      })

      return data
    } catch (error) {
      this.logger.log(`Fetch Running Auctions fails`)
      throw error
    }
  }
}
