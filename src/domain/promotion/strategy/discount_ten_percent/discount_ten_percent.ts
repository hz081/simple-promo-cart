import { PromotionPayload, PromotionResponse } from '../../data/index';
import { injectable } from 'inversify';
import ICalculatePriceStrategy from '../interface';

@injectable()
class DiscountTenPercentStrategy implements ICalculatePriceStrategy {
    private PrimarySKU: string;

    constructor() {
        this.PrimarySKU = 'A304SD';
    }

    async calculate(payloads: PromotionPayload[]): Promise<PromotionResponse> {
        let totalPrice = 0;
        payloads.forEach((payload, index, object) => {
            if (payload.sku === this.PrimarySKU) {
                const calculation = payload.qty * payload.price;
                if (payload.qty >= 3) {
                    totalPrice = calculation - (0.1 * calculation);
                } else {
                    totalPrice = calculation;
                }
                object.splice(index, 1);
            }
        });
        return { payloads, totalPrice };
    }
}

export default DiscountTenPercentStrategy;
