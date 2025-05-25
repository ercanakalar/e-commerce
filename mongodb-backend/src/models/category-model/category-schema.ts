import { buildSchema } from 'graphql';

const categoryTypeDefs = buildSchema(`
    type Category {
        id: ID
        name: String
    }

    type CategoryResponse {
        message: String
        data: Category
    }

    type GetCategoryResponse {
        message: String
        data: [Category]
    }

    type Mutation {
        createCategory(name: String): CategoryResponse
    }

    type Query {
        getCategories: GetCategoryResponse
    }
`);

export default categoryTypeDefs;
