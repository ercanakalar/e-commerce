import { buildSchema } from 'graphql';

const categoryGroupTypeDefs = buildSchema(`
    type CategoryGroup {
        id: ID
        name: String
    }

    type CategoryGroupResponse {
        message: String
        data: CategoryGroup
        token: String
    }

    type Query {
        getGroupCategories: CategoryGroup
    }
`);

export default categoryGroupTypeDefs;
