import { inject, injectable } from 'inversify'

import { ICarOnSaleClient } from '../interface/ICarOnSaleClient'
import { ILogger } from '../../Logger/interface/ILogger';
import { IAuthentication } from '../../Authentication/interface/IAuthentication';
import { DependencyIdentifier } from "../../../DependencyIdentifiers";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  constructor(
    // @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.AUTHENTICATION) private authentication: IAuthentication,
  ) {}
  public async getRunningAuctions() {
    try {
      const user = await this.authentication.authenticate()
      console.log('helooo>>>>', user)
      return user
    }catch (error) {
      throw error
    }
  }
}