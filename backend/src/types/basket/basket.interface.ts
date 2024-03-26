export interface IBasket {
    productId: number;
    quantity: number;
}

export interface IBasketDatabase {
    id: number;
    auth_id: number;
    product_id: number;
    quantity: number;
    created_at: Date;
}