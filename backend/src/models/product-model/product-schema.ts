import { buildSchema } from 'graphql';

const productTypeDefs = buildSchema(`
    type Product {
        id: ID
    }

    type ProductResponse {
        message: String
        data: Product
        token: String
    }
`);

export default productTypeDefs;
