import { injectable, inject } from 'inversify'

import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { ICarOnSaleClientService } from '../interface/ICarOnSaleClientService'
import { IAuction, IAggregate } from '../../../types/IAuctions'
import { ILogger } from '../../Logger/interface/ILogger'

@injectable()
export class CarOnSaleClientService implements ICarOnSaleClientService {

  public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger) {}

  public getAggregate(auctions: any): IAggregate {
    this.logger.log(`Fetching Auction Aggregates.`)
    const { cummulativeBids, cummulativePercentProgress } = auctions.items.reduce(
      (acc: IAuction, curr: IAuction) => {
        const { numBids, currentHighestBidValue, minimumRequiredAsk } = curr
        acc.cummulativeBids += numBids
        acc.cummulativePercentProgress += currentHighestBidValue / minimumRequiredAsk
        return {
          ...acc
        }
      },
      { cummulativeBids: 0, cummulativePercentProgress: 0 }
    )
    return {
      avgNumOfBids: cummulativeBids / auctions.total,
      avgPercentOfAuctionProgress: cummulativePercentProgress / auctions.total
    }
  }
}
