import { Container } from "inversify";
import controllerModule from "./module/controller";
import serviceModule from "./module/service";
import strategyModule from "./module/strategy";

const container = new Container();
container.load(serviceModule, controllerModule, strategyModule);

export default container;
