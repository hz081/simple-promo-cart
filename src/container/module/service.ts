import { ContainerModule } from "inversify";
import PromotionServiceID from "../../domain/promotion/identifier/service";
import IPromotionService from "../../domain/promotion/service/interface";
import PromotionService from "../../domain/promotion/service/service";

const serviceModule = new ContainerModule((bind) => {
    bind<IPromotionService>(PromotionServiceID.PromotionService).to(PromotionService).inSingletonScope();
});

export default serviceModule;