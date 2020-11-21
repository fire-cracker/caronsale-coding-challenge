import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CARONSALECLIENT) private carOnSaleClient: ICarOnSaleClient
    ) {}

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);
        await this.carOnSaleClient.getRunningAuctions()
        // TODO: Retrieve auctions and display aggregated information (see README.md)

    }

}