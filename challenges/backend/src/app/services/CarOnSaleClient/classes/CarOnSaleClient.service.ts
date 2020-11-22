import { injectable, inject } from 'inversify'

import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { ICarOnSaleClientService } from '../interface/ICarOnSaleClientService'
import { IAuction, IAggregate } from '../../../types/IAuctions'
import { ILogger } from '../../Logger/interface/ILogger'

@injectable()
export class CarOnSaleClientService implements ICarOnSaleClientService {
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
  ) {}

  public getAggregate(auctions: any): IAggregate {
    const { cummulativeBids,  cummulativePercentProgress } = auctions.items.reduce(
      (prev: IAuction, curr: IAuction) => {
        const { numBids, currentHighestBidValue, minimumRequiredAsk } = curr
        prev.cummulativeBids += numBids
        prev.cummulativePercentProgress += currentHighestBidValue / minimumRequiredAsk
        return {
          ...prev
        }
      },
      { cummulativeBids: 0, cummulativePercentProgress: 0 }
    )
    return {
      avgBids: (cummulativeBids / auctions.total),
      avgPercentProgress: (cummulativePercentProgress / auctions.total)
    }
  }
}
