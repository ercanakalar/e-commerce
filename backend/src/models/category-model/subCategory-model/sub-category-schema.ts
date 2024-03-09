import { buildSchema } from 'graphql';

const subCategoryTypeDefs = buildSchema(`
    type SubCategory {
        id: ID
    }

    type SubCategoryResponse {
        message: String
        data: SubCategory
        token: String
    }
`);

export default subCategoryTypeDefs;
