import { buildSchema } from 'graphql';

const basketTypeDefs = buildSchema(`
    type Basket {
        id: Int
        authId: Int
        productId: Int
        quantity: Int
    }

    type BasketResponse {
        message: String
        data: Basket
    }
    type BasketGetResponse {
        message: String
        data: [Basket]
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
