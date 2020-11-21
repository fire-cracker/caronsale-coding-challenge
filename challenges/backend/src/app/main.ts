import {Container} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {IAuthentication} from "./services/Authentication/interface/IAuthentication";
import {Logger} from "./services/Logger/classes/Logger";
import {CarOnSaleClient} from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import {Authentication} from "./services/Authentication/classes/Authentication";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {DependencyIdentifier} from "./DependencyIdentifiers";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CARONSALECLIENT).to(CarOnSaleClient);
container.bind<IAuthentication>(DependencyIdentifier.AUTHENTICATION).to(Authentication);


/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    try{
        await app.start();
        process.exit(0)
    }catch(error) {
        process.exit(-1)
    }
})();
