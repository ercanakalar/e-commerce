import { buildSchema } from 'graphql';

const favoriteTypeDefs = buildSchema(`
    type Favorite {
        authId: Int
        productId: Int
    }
`);

export default favoriteTypeDefs;
