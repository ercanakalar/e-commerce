import { buildSchema } from 'graphql';

const productTypeDefs = buildSchema(`
    type Product {
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
    type ProductCreate {
        authId: ID
        category: Int
        subCategory: Int
        group: Int
        children: Int
        name: String
        price: Float
        description: String
        stock: Int
        images: [String]
        shipping: Boolean
        brand: String
    }
    type ProductGetById {
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
    type ProductUpdate {
        id: ID
        price: Float
        discount: Float
        description: String
        stock: Int
        images: [String]
        shipping: Boolean
    }

    type ProductResponse {
        message: String
        data: ProductCreate
    }
    type ProductsResponse {
        message: String
        data: [Product]
    }
    type ProductGetIdResponse {
        message: String
        data: ProductGetById
    }
    type ProductUpdateResponse {
        message: String
        data: ProductUpdate
    }
    type ProductDeleteResponse {
        message: String
    }

    type Mutation {
        createProduct(category: Int, subCategory: Int, group: Int, children: Int, name: String, price: Float, description: String, stock: Int, images: [String], shipping: Boolean, brand: String): ProductResponse
        getProductById(id: ID): ProductGetIdResponse
        updateProductById(id: ID, price: Float, discount: Float, description: String, stock: Int, images: [String], shipping: Boolean): ProductUpdateResponse
        deleteProductById(id: ID): ProductDeleteResponse
    }

    type Query {
        getProducts: ProductsResponse
    }
`);

export default productTypeDefs;
