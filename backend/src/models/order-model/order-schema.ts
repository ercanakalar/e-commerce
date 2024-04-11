import { buildSchema } from 'graphql';

const orderTypeDefs = buildSchema(`
    type Order {
        authId: String
        orderId: [String]
        addressId: String
        quantity: [Int]
        orderStatus: String
        totalPrice: Float
    }

    type Mutation {
        createOrder(orderId: [String], addressId: String, quantity: [Int], orderStatus: String, totalPrice: Float): String
        cancelOrder(orderId: [String], addressId: String, quantity: [Int], orderStatus: String, totalPrice: Float): String
        getOrderById(authId: String): String
    }
    type Query {
        getOrders: String
    }
`);

export default orderTypeDefs;
