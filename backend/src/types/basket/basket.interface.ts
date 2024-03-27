export interface IBasket {
    productId: number;
    quantity: number;
}

export interface IBasketInfo {
    id?: number;
    authId?: number;
    productId?: number;
    quantity?: number;
    productName?: string;
    price?: number;
    images?: string[];
}

export interface IBasketDatabase {
    id: number;
    auth_id: number;
    product_id: number;
    quantity: number;
    name: string;
    price: number;
    images: string[];
    total_price: number;
}