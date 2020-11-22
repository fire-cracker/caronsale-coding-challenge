import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {ICarOnSaleClientService} from "./services/CarOnSaleClient/interface/ICarOnSaleClientService";
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
            const runningAuctions = await this.carOnSaleClient.getRunningAuctions()
            const aggregate = await this.carOnSaleClientService.getAggregate(runningAuctions)

            console.log('aggregate>>>>', aggregate)
            this.logger.log(`${runningAuctions}`);
            this.logger.log('Auction Monitor ran successfully!');
            process.exit(0)
        }catch(error) {
            this.logger.log(`Auction Monitor fails with ${error}`);
            process.exit(-1)
        }
    }

}