import { ContainerModule } from "inversify";
import BuyOneGetBonusStrategy from "../../domain/promotion/strategy/buy_one_get_bonus/buy_one_get_bonus";
import BuyOneGetBonusStrategyID from "../../domain/promotion/strategy/buy_one_get_bonus/identifier";
import DiscountTenPercentStrategy from "../../domain/promotion/strategy/discount_ten_percent/discount_ten_percent";
import DiscountTenPercentStrategyID from "../../domain/promotion/strategy/discount_ten_percent/identifier";
import ICalculatePriceStrategy from "../../domain/promotion/strategy/interface";
import PayTwoForThreeStrategyID from "../../domain/promotion/strategy/pay_two_for_three/identifier";
import PayTwoForThreeStrategy from "../../domain/promotion/strategy/pay_two_for_three/pay_two_for_three";

const strategyModule = new ContainerModule((bind) => {
    bind<ICalculatePriceStrategy>(BuyOneGetBonusStrategyID.BuyOneGetBonusStrategy).to(BuyOneGetBonusStrategy).inSingletonScope();
    bind<ICalculatePriceStrategy>(DiscountTenPercentStrategyID.DiscountTenPercentStrategy).to(DiscountTenPercentStrategy).inSingletonScope();
    bind<ICalculatePriceStrategy>(PayTwoForThreeStrategyID.PayTwoForThreeStrategy).to(PayTwoForThreeStrategy).inSingletonScope();
});

export default strategyModule;