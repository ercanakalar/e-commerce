import { buildSchema } from 'graphql';

const favoriteTypeDefs = buildSchema(`
    type Favorite {
        authId: Int
        productId: Int
    }

    type FavoriteResponse {
        message: String
        favorite: Favorite
    }
    type FavoriteGetResponse {
        message: String
        favorite: [Favorite]
    }

    type Mutation {
        addFavorite(productId: ID!): FavoriteResponse
        removeFavorite(productId: Int): FavoriteResponse
    }
    type Query {
        getFavorites: FavoriteGetResponse
    }
`);

export default favoriteTypeDefs;
