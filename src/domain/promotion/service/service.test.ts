import { Container } from 'inversify';
import { ContainerModule } from 'inversify';
import { describe, it } from "mocha";
import { expect } from "chai";
import PromotionServiceID from '../identifier/service';
import BuyOneGetBonusStrategy from '../strategy/buy_one_get_bonus/buy_one_get_bonus';
import BuyOneGetBonusStrategyID from '../strategy/buy_one_get_bonus/identifier';
import DiscountTenPercentStrategy from '../strategy/discount_ten_percent/discount_ten_percent';
import DiscountTenPercentStrategyID from '../strategy/discount_ten_percent/identifier';
import ICalculatePriceStrategy from '../strategy/interface';
import PayTwoForThreeStrategyID from '../strategy/pay_two_for_three/identifier';
import PayTwoForThreeStrategy from '../strategy/pay_two_for_three/pay_two_for_three';
import IPromotionService from './interface';
import PromotionService from './service';

const _container = new Container();
let containerModule: ContainerModule;
let service: IPromotionService;

function initTest() {
    containerModule = new ContainerModule((bind) => {
        bind<ICalculatePriceStrategy>(BuyOneGetBonusStrategyID.BuyOneGetBonusStrategy).to(BuyOneGetBonusStrategy).inSingletonScope();
        bind<ICalculatePriceStrategy>(DiscountTenPercentStrategyID.DiscountTenPercentStrategy).to(DiscountTenPercentStrategy).inSingletonScope();
        bind<ICalculatePriceStrategy>(PayTwoForThreeStrategyID.PayTwoForThreeStrategy).to(PayTwoForThreeStrategy).inSingletonScope();
        bind<IPromotionService>(PromotionServiceID.PromotionService).to(PromotionService).inSingletonScope();
    });
    _container.load(containerModule);
    service = _container.get<IPromotionService>(PromotionServiceID.PromotionService);
}

function unloadTest() {
    _container.unload();
    _container.unbindAll();
}

describe('service', function () {
    beforeEach(async () => {
        initTest();
    });

    afterEach(() => {
        unloadTest();
    });

    it('with no data', async function () {
        const result = await service.calculatePrice([]);
        expect(result.totalPrice).equal(0);
    });

    it('buy one get bonus', async function () {
        const payloads = [
            {
                "sku":      "43N23P",
                "name":     "MacBook Pro",
                "price":    5399.99,
                "qty":      1
            }, {
                "sku":      "234234",
                "name":     "Raspberry Pi B",
                "price":    30,
                "qty":      1
            }
        ];
        const result = await service.calculatePrice(payloads);
        expect(result.totalPrice).equal(5399.99);
    });

    it('buy one get bonus - with additional secondary sku', async function () {
        const payloads = [
            {
                "sku":      "43N23P",
                "name":     "MacBook Pro",
                "price":    5399.99,
                "qty":      1
            }, {
                "sku":      "234234",
                "name":     "Raspberry Pi B",
                "price":    30,
                "qty":      2
            }
        ];
        const result = await service.calculatePrice(payloads);
        expect(result.totalPrice).equal(5429.99);
    });

    it('buy one get bonus - without bonus', async function () {
        const payloads = [
            {
                "sku":      "43N23P",
                "name":     "MacBook Pro",
                "price":    5399.99,
                "qty":      1
            }
        ];
        const result = await service.calculatePrice(payloads);
        expect(result.totalPrice).equal(5399.99);
    });

    it('discount ten percent', async function () {
        const payloads = [
            {
                "sku":      "A304SD",
                "name":     "Alexa Speaker",
                "price":    109.50,
                "qty":      3
            }
        ];
        const result = await service.calculatePrice(payloads);
        expect(result.totalPrice).equal(295.65);
    });

    it('not - discount ten percent', async function () {
        const payloads = [
            {
                "sku":      "A304SD",
                "name":     "Alexa Speaker",
                "price":    109.50,
                "qty":      2
            }
        ];
        const result = await service.calculatePrice(payloads);
        expect(result.totalPrice).equal(219);
    });

    it('pay two for three', async function () {
        const payloads = [
            {
                "sku":      "120P90",
                "name":     "Google Hone",
                "price":    49.99,
                "qty":      3
            }
        ];
        const result = await service.calculatePrice(payloads);
        expect(result.totalPrice).equal(99.98);
    });
});