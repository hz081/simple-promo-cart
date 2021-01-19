import { PromotionPayload, PromotionResponse } from '../../data/index';
import { injectable } from 'inversify';
import ICalculatePriceStrategy from '../interface';

@injectable()
class PayTwoForThreeStrategy implements ICalculatePriceStrategy {
    private PrimarySKU: string;
    private QTY_NUMBER = 3;

    constructor() {
        this.PrimarySKU = '120P90';
    }

    async calculate(payloads: PromotionPayload[]): Promise<PromotionResponse> {
        let totalPrice = 0;
        payloads.forEach((payload, index, object) => {
            if (payload.sku === this.PrimarySKU) {
                const qtyPerThree = payload.qty / this.QTY_NUMBER;
                const qtyLeft = payload.qty % this.QTY_NUMBER;
                totalPrice += (qtyPerThree * 2 * payload.price) + (qtyLeft * payload.price);
                object.splice(index, 1);
            }
        });
        return { payloads, totalPrice };
    }
}

export default PayTwoForThreeStrategy;
