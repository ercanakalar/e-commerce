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
        updateProfile(firstName: String, lastName: String, photo: String, active: Boolean): ProfileResponse
    }

    type Query {
        getProfileById(authId: ID): Profile
        getOwnProfile: ProfileResponse
    }
`);

export default profileTypeDefs;
