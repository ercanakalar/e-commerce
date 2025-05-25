import { buildSchema } from 'graphql';

const categoryChildrenTypeDefs = buildSchema(`
    type ChildrenCategoryChildren {
        id: ID
        name: String
    }

    type CategoryChildrenResponse {
        message: String
        data: ChildrenCategoryChildren
    }

    type GetChildrenCategoryResponse {
        message: String
        data: [ChildrenCategoryChildren]
    }

    type Mutation {
        createChildrenCategory(name: String): CategoryChildrenResponse
    }

    type Query {
        getChildrenCategories: GetChildrenCategoryResponse
    }
`);

export default categoryChildrenTypeDefs;
