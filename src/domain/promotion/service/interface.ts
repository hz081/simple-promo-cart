import { PromotionPayload } from './../data/index';

interface IPromotionService {
    calculatePrice: (payloads: PromotionPayload[]) => Promise<any>;
}

export default IPromotionService;