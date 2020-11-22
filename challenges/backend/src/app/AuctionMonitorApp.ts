import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {ICarOnSaleClientService} from "./services/CarOnSaleClient/interface/ICarOnSaleClientService";
import { IAuctions, IAggregate } from './types/IAuctions'
import {DependencyIdentifier} from "./DependencyIdentifiers";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CARONSALECLIENT) private carOnSaleClient: ICarOnSaleClient,
        @inject(DependencyIdentifier.CARONSALECLIENTSERVICE) private carOnSaleClientService: ICarOnSaleClientService
    ) {}

    public async start(): Promise<void> {
        try {
            this.logger.log(`Auction Monitor started.`);
            const runningAuctions: IAuctions = await this.carOnSaleClient.getRunningAuctions()
            const aggregate:IAggregate = this.carOnSaleClientService.getAggregate(runningAuctions)

            this.logger.log(`
            TOTAL NUMBER OF AUCTIONS: ${runningAuctions.total}
            AVERAGE NUMBER OF BIDS: ${aggregate.avgNumOfBids}
            AVERAGE PERCENTAGE OF AUCTION PROGRESS: ${aggregate.avgPercentOfAuctionProgress}
        `)
            this.logger.log('Auction Monitor ran successfully!');
            process.exit(0)
        }catch(error) {
            this.logger.log(`Auction Monitor fails with ${error}`);
            process.exit(-1)
        }
    }

}