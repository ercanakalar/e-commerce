import { buildSchema } from 'graphql';

const categoryGroupTypeDefs = buildSchema(`
    type CategoryGroup {
        id: ID
    }

    type CategoryGroupResponse {
        message: String
        data: CategoryGroup
        token: String
    }
`);

export default categoryGroupTypeDefs;
