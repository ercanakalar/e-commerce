import { buildSchema } from 'graphql';

const favoriteTypeDefs = buildSchema(`
    type Favorite {
        authId: Int
        products: [Int]
    }

    type FavoriteResponse {
        message: String
        data: Favorite
    }
    type FavoriteGetResponse {
        message: String
        data: [Favorite]
    }

    type Mutation {
        addFavorite(productId: Int): FavoriteResponse
        removeFavorite(productId: Int): FavoriteResponse
    }
    type Query {
        getFavorites: FavoriteGetResponse
    }
`);

export default favoriteTypeDefs;
