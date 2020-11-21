import { injectable, inject } from 'inversify'
import axios from 'axios'

import { ICarOnSaleClient } from '../interface/ICarOnSaleClient'
import { ILogger } from '../../Logger/interface/ILogger'
import { IAuthentication } from '../../Authentication/interface/IAuthentication'
import { IConfig } from '../../../helpers/types'
import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import config from '../../../helpers/config'

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.AUTHENTICATION) private authentication: IAuthentication
  ) {
    ;({ baseUrl: this.baseUrl } = config)
  }

  private baseUrl: IConfig['baseUrl']

  public async getRunningAuctions() {
    try {
      const { userId, token } = await this.authentication.authenticate()
      const { data } = await axios.get(`${this.baseUrl}/v2/auction/buyer/`, {
        headers: { userId, authToken: token }
      })

      const auctions = data.items.map(({ numBids, minimumRequiredAsk, currentHighestBidValue }) => ({
        numBids,
        percentageOfAuctionProgress: (currentHighestBidValue / minimumRequiredAsk)
      }))
      return {
        auctions,
        numOfAuctions: data.total
      }
    } catch (error) {
      throw error
    }
  }
}
