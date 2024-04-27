import { buildSchema } from 'graphql';

const orderTypeDefs = buildSchema(`
    type Order {
        productId: [Int]
        addressId: Int
        quantity: [Int]
        totalPrice: Float
        status: String
        createdAt: String
    }
    type OrderUpdate {
        status: String
    }

    type OrderResponse {
        message: String
        data: Order
    }
    type OrderUpdateResponse {
        message: String
        data: OrderUpdate
    }
    type OrderListResponse {
        message: String
        data: [Order]
    }

    type Mutation {
        createOrder(productId: [Int], addressId: Int, quantity: [Int], totalPrice: Float): OrderResponse
        updateOrder(orderId: Int, status: String): OrderUpdateResponse
        getOrderById(orderId: Int): OrderResponse
    }
    type Query {
        getOrders: OrderListResponse
    }
`);

export default orderTypeDefs;
