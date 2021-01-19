export type PromotionPayload = {
    sku: string,
    name: string,
    price: number,
    qty: number,
};

export type PromotionResponse = {
    payloads: PromotionPayload[],
    totalPrice: number,
};
