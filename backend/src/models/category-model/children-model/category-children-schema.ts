import { buildSchema } from 'graphql';

const categoryChildrenTypeDefs = buildSchema(`
    type CategoryChildren {
        id: ID
        name: String
    }

    type CategoryChildrenResponse {
        message: String
        data: CategoryChildren
        token: String
    }

    type Query {
        getChildrenCategories: CategoryChildren
    }
`);

export default categoryChildrenTypeDefs;
