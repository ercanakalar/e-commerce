import { buildSchema } from 'graphql';

const orderTypeDefs = buildSchema(`
    type Order {
        authId: String
        productId: [String]
        addressId: String
        quantity: [Int]
        orderStatus: String
        totalPrice: Float
    }

    type Mutation {
        createOrder(productId: [String], addressId: String, quantity: [Int], totalPrice: Float): String
        cancelOrder(orderId: String): String
        getOrderById(orderId: String): String
    }
    type Query {
        getOrders: String
    }
`);

export default orderTypeDefs;
