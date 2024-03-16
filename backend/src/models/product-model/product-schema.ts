import { buildSchema } from 'graphql';

const productTypeDefs = buildSchema(`
    type Product {
        userId: ID
        category: String
        subCategory: String
        group: String
        children: String
        name: String
        price: Float
        description: String
        rating: Float
        stock: Int
        sold: Int
        images: [String]
        shipping: String
        brand: String
    }

    type ProductUpdate {
        id: ID
        price: Float
        description: String
        stock: Int
        images: [String]
        shipping: String
    }

    type ProductResponse {
        message: String
        data: Product
    }

    type ProductsResponse {
        message: String
        data: [Product]
    }

    type ProductUpdateResponse {
        message: String
        data: ProductUpdate
    }

    type Mutation {
        createProduct(category: String, subCategory: String, group: String, children: String, name: String, price: Float, description: String, rating: Float, stock: Int, sold: Int, images: [String], shipping: String, brand: String): ProductResponse
        getProductById(id: ID): ProductResponse
        updateProductById(id: ID, price: Float, description: String, stock: Int, images: [String], shipping: String): ProductUpdateResponse
    }

    type Query {
        getProducts: ProductsResponse
    }
`);

export default productTypeDefs;
