import { buildSchema } from 'graphql';

const typeDefs = buildSchema(`
    type Profile {
        id: ID
        userId: String
        firstName: String
        lastName: String
        email: String
        photo: String
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
        updateProfile(firstName: String, lastName: String, photo: String): ProfileResponse
    }

    type Query {
        getProfileById(profileId: ID): Profile
    }
`);

export default typeDefs;
