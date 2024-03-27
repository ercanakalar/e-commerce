import { buildSchema } from 'graphql';

const basketTypeDefs = buildSchema(`
    type Basket {
        id: Int
        authId: Int
        productId: Int
        quantity: Int
    }
    type BasketGet {
        id: Int
        authId: Int
        productId: Int
        quantity: Int
        productName: String,
        price: Float,
        images: [String],
        totalValue: Float
    }

    type BasketResponse {
        message: String
        data: Basket
    }
    type BasketGetResponse {
        message: String
        totalCharge: Float
        data: [BasketGet]
    }

    type Mutation {
        addBasket(productId: Int, quantity: Int): BasketResponse
        updateBasket(id: ID, productId: Int, quantity: Int): BasketResponse
        deleteBasket(id: ID): BasketResponse
    }

    type Query {
        getBaskets: BasketGetResponse
    }
`);

export default basketTypeDefs;
