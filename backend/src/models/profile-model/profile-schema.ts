import { buildSchema } from 'graphql';

const profileTypeDefs = buildSchema(`
    type Profile {
        id: ID
        authId: String
        firstName: String
        lastName: String
        email: String
        photo: String
        active: Boolean
    }

    type ProfileResponse {
        message: String
        data: Profile
        token: String
    }

    type ProfileWithToken {
        token: String
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
