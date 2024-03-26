import { buildSchema } from 'graphql';

const basketTypeDefs = buildSchema(`
    type Basket {
        id: ID
        authId: Int
        productId: Int
        quantity: Int
    }

    type BasketAddResponse {
        message: String
        data: Basket
    }
    type BasketGetResponse {
        message: String
        data: [Basket]
    }
    type BasketMessageResponse {
        message: String
    }

    type Mutation {
        addBasket(authId: Int, productId: Int, quantity: Int): BasketAddResponse
        updateBasket(id: ID, productId: Int, quantity: Int): BasketMessageResponse
        deleteBasket(id: ID): BasketMessageResponse
    }

    type Query {
        getBaskets: BasketGetResponse
    }
`);

export default basketTypeDefs;
