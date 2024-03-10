import { buildSchema } from 'graphql';

const subCategoryTypeDefs = buildSchema(`
    type SubCategory {
        id: ID
        name: String
    }

    type SubCategoryResponse {
        message: String
        data: SubCategory
    }

    type GetSubCategoryResponse {
        message: String
        data: [SubCategory]
    }

    type Mutation {
        createSubCategory(name: String): SubCategoryResponse
    }

    type Query {
        getSubCategories: GetSubCategoryResponse
    }
`);

export default subCategoryTypeDefs;
