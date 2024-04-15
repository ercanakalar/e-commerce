export interface IOrder {
  authId: string;
  productId: string[];
  addressId: string;
  quantity: number[];
  totalPrice: number;
}

export interface IOrderId {
  orderId: string;
}

export interface IOrderDatabase {
    id: number;
    auth_id: number;
    product_id: number[];
    address_id: number;
    quantity: number[];
    order_status: string;
    total_price: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}