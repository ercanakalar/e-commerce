import { buildSchema } from 'graphql';

const profileTypeDefs = buildSchema(`
    type Profile {
        id: ID
        authId: String
        address: Int
        phone: String
        photo: String
    }

    type ProfileResponse {
        message: String
        data: Profile
    }

    type Mutation {
        updateProfile(address: Int, phone: String, photo: String): ProfileResponse
    }

    type Query {
        getProfileById(authId: ID): Profile
        getOwnProfile: ProfileResponse
    }
`);

export default profileTypeDefs;
