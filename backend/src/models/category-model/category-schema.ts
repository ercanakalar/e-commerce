import { buildSchema } from 'graphql';

const productTypeDefs = buildSchema(`
    type product {
        id: ID
    }

    type productResponse {
        message: String
        data: product
        token: String
    }

    type Mutation {
        createProduct(category: String): productResponse
    }

`);

export default productTypeDefs;
