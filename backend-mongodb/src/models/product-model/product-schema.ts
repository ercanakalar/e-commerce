import { buildSchema } from 'graphql';

const productTypeDefs = buildSchema(`
    type Product {
        authId: ID
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
    type ProductCreate {
        authId: ID
        category: String
        subCategory: String
        group: String
        children: String
        name: String
        price: Float
        description: String
        stock: Int
        images: [String]
        shipping: String
        brand: String
    }
    type ProductUpdate {
        id: ID
        price: Float
        discount: Float
        description: String
        stock: Int
        images: [String]
        shipping: String
    }

    type ProductResponse {
        message: String
        data: ProductCreate
    }
    type ProductsResponse {
        message: String
        data: [Product]
    }
    type ProductUpdateResponse {
        message: String
        data: ProductUpdate
    }
    type ProductDeleteResponse {
        message: String
    }

    type Mutation {
        createProduct(category: String, subCategory: String, group: String, children: String, name: String, price: Float, description: String, stock: Int, images: [String], shipping: String, brand: String): ProductResponse
        getProductById(id: ID): ProductResponse
        updateProductById(id: ID, price: Float, discount: Float, description: String, stock: Int, images: [String], shipping: String): ProductUpdateResponse
        deleteProductById(id: ID): ProductDeleteResponse
    }

    type Query {
        getProducts: ProductsResponse
    }
`);

export default productTypeDefs;
