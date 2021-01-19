import { Request, ResponseToolkit } from "@hapi/hapi";
import container from "../container";
import PromotionController from "../controller/promotion";

const promotionController = container.get<PromotionController>(PromotionController);

const router = [
    {
        method: 'GET',
        path: '/ping',
        options: {
            auth: false,
        },
        handler: function (request: Request, h: ResponseToolkit) {
            return { message: 'ok', serverTime: new Date().getTime() };
        },
    }, {
        method: 'POST',
        path: '/v1/checkout',
        handler: promotionController.calculatePrice,
        options: {
            auth: 'simple',
        },
    }
];

export default router;
