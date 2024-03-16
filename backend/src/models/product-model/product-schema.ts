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

    type ProductResponse {
        message: String
        data: Product
    }

    type ProductsResponse {
        message: String
        data: [Product]
    }

    type Mutation {
        createProduct(category: String, subCategory: String, group: String, children: String, name: String, price: Float, description: String, rating: Float, stock: Int, sold: Int, images: [String], shipping: String, brand: String): ProductResponse
        getProductById(id: ID): ProductResponse
    }

    type Query {
        getProducts: ProductsResponse
    }
`);

export default productTypeDefs;
