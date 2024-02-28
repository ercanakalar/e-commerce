import { buildSchema } from 'graphql';

const categoryTypeDefs = buildSchema(`
    type Category {
        id: ID
    }

    type CategoryResponse {
        message: String
        data: Category
        token: String
    }

    type Mutation {
        createCategory(category: String): CategoryResponse
    }

`);

export default categoryTypeDefs;
