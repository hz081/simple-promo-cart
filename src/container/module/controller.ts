import { ContainerModule } from 'inversify';
import PromotionController from '../../controller/promotion';

const controllerModule = new ContainerModule((bind) => {
    bind<PromotionController>(PromotionController).toSelf().inSingletonScope();
});

export default controllerModule;