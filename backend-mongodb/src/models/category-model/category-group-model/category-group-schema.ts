import { buildSchema } from 'graphql';

const categoryGroupTypeDefs = buildSchema(`
    type CategoryGroup {
        id: ID
        name: String
    }

    type CategoryGroupResponse {
        message: String
        data: CategoryGroup
    }

    type GetGroupCategoryResponse {
        message: String
        data: [CategoryGroup]
    }

    type Mutation {
        createGroupCategory(name: String): CategoryGroupResponse
    }

    type Query {
        getGroupCategories: GetGroupCategoryResponse
    }
`);

export default categoryGroupTypeDefs;
