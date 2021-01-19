import { PromotionPayload, PromotionResponse } from '../../data/index';
import { injectable } from 'inversify';
import ICalculatePriceStrategy from '../interface';

@injectable()
class BuyOneGetBonusStrategy implements ICalculatePriceStrategy {
    private PrimarySKU: string;
    private SecondarySKU: string;

    constructor() {
        this.PrimarySKU = '43N23P';
        this.SecondarySKU = '234234';
    }

    async calculate(payloads: PromotionPayload[]): Promise<PromotionResponse> {
        let totalPrice = 0;
        let countPrimarySKU = 0;
        payloads.forEach((payload, index, object) => {
            if (payload.sku === this.PrimarySKU) {
                totalPrice += payload.price * payload.qty;
                countPrimarySKU = payload.qty;
                object.splice(index, 1);
            }
        });
        payloads.forEach((payload, index, object) => {
            if (payload.sku === this.SecondarySKU) {
                payload.qty -= countPrimarySKU;
                if (payload.qty > 0) totalPrice += payload.qty * payload.price;
                object.splice(index, 1);
            }
        });
        return { payloads, totalPrice };
    }
}

export default BuyOneGetBonusStrategy;
