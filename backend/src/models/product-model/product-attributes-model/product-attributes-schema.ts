import { buildSchema } from 'graphql';

const productAttributesTypeDefs = buildSchema(`
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

    type CreateProductAttribute {
        message: String
    }

    type Mutation {
        createProductAttribute(productId: Int!, attributeKey: String!, attributeValue: String!): CreateProductAttribute
    }
`);

export default productAttributesTypeDefs;
