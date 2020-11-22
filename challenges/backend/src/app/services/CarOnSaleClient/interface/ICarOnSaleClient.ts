import { IAuctions } from '../../../types/IAuctions'

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    getRunningAuctions(): Promise<IAuctions>

}
