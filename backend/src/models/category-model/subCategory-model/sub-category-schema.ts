import { buildSchema } from 'graphql';

const subCategoryTypeDefs = buildSchema(`
    type SubCategory {
        id: ID
        name: String
    }

    type SubCategoryResponse {
        message: String
        data: SubCategory
        token: String
    }

    type Query {
        getSubCategories: SubCategory
    }
`);

export default subCategoryTypeDefs;
