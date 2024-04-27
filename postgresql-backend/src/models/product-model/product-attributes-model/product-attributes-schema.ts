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

    type ProductAttributeResponse {
        message: String
    }

    type Mutation {
        createProductAttribute(productId: Int!, attributeKey: String!, attributeValue: String!): ProductAttributeResponse
        deleteProductAttribute(attributeId: Int!): ProductAttributeResponse
        updateProductAttribute(attributeId: Int!, attributeKey: String!, attributeValue: String!): ProductAttributeResponse
    }
`);

export default productAttributesTypeDefs;
