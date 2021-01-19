import { PromotionPayload, PromotionResponse } from './../data/index';

interface ICalculatePriceStrategy {
    calculate: (payloads: PromotionPayload[]) => Promise<PromotionResponse>;
}

export default ICalculatePriceStrategy;