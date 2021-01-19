import { PromotionPayload } from './../../domain/promotion/data/index';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { inject, injectable } from 'inversify';
import autoBind from 'auto-bind';
import PromotionServiceID from '../../domain/promotion/identifier/service';
import IPromotionService from '../../domain/promotion/service/interface';

@injectable()
export default class PromotionController {
    @inject(PromotionServiceID.PromotionService) service!: IPromotionService;

    constructor() {
        autoBind(this);
    }

    async calculatePrice(request: Request, h: ResponseToolkit){
        const payloads: PromotionPayload[] = request.payload as PromotionPayload[];
        return await this.service.calculatePrice(payloads);
    }
}