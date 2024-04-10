import { buildSchema } from 'graphql';

const productTypeDefs = buildSchema(`
    type ProductAttributes {
        authId: ID
        category: Int
        subCategory: Int
        group: Int
        children: Int
        name: String
        price: Float
        description: String
        rating: Float
        stock: Int
        sold: Int
        images: [String]
        shipping: Boolean
        brand: String
    }

    type Mutation {
    }

    type Query {
    }
`);

export default productTypeDefs;
