import { IAuctions, IAggregate } from '../../../types/IAuctions'

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClientService {

    getAggregate(auctions: IAuctions): IAggregate

}
