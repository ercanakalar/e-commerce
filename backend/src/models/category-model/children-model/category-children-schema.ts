import { buildSchema } from 'graphql';

const categoryChildrenTypeDefs = buildSchema(`
    type CategoryChildren {
        id: ID
    }

    type CategoryChildrenResponse {
        message: String
        data: CategoryChildren
        token: String
    }
`);

export default categoryChildrenTypeDefs;
