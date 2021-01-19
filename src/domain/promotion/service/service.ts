import { inject } from 'inversify';
import { PromotionPayload, PromotionResponse } from './../data/index';
import { injectable } from 'inversify';
import IPromotionService from './interface';
import BuyOneGetBonusStrategyID from '../strategy/buy_one_get_bonus/identifier';
import ICalculatePriceStrategy from '../strategy/interface';
import DiscountTenPercentStrategyID from '../strategy/discount_ten_percent/identifier';
import PayTwoForThreeStrategyID from '../strategy/pay_two_for_three/identifier';

@injectable()
class PromotionService implements IPromotionService {

    @inject(BuyOneGetBonusStrategyID.BuyOneGetBonusStrategy) buyOneGetBonusStrategy!: ICalculatePriceStrategy;
    @inject(DiscountTenPercentStrategyID.DiscountTenPercentStrategy) discountTenPercentStrategy!: ICalculatePriceStrategy;
    @inject(PayTwoForThreeStrategyID.PayTwoForThreeStrategy) payTwoForThreeStrategy!: ICalculatePriceStrategy;

    async calculatePrice(payloads: PromotionPayload[]): Promise<any> {
        let totalPrice: number = 0;
        let result: PromotionResponse;

        // call buy one get bonus strategy
        result = await this.buyOneGetBonusStrategy.calculate(payloads);
        totalPrice += result.totalPrice;

        // call discount ten percent strategy
        result = await this.discountTenPercentStrategy.calculate(payloads);
        totalPrice += result.totalPrice;

        // call pay two for three strategy
        result = await this.payTwoForThreeStrategy.calculate(payloads);
        totalPrice += result.totalPrice;

        return  { totalPrice };
    }
}

export default PromotionService;