import { buildSchema } from 'graphql';

const authTypeDefs = buildSchema(`
    type Auth {
        id: ID
        firstName: String
        lastName: String
        email: String
    }
    type SignUpResponse {
        message: String
        data: Auth
        token: String
    }
    
    type CurrentAuth {
        id: ID
        email: String
    }
    type CurrentAuthResponse {
        message: String
        data: CurrentAuth
        token: String
    }
    
    type Mutation {
        signUp(firstName: String, lastName: String, email: String, password: String, confirmPassword: String): SignUpResponse
        signIn(email: String, password: String): SignUpResponse
        signOut: String
        updatePassword(currentPassword: String, newPassword: String, confirmNewPassword: String): String
        forgotPassword(email: String): String
        resetPassword(token: String, newPassword: String, confirmNewPassword: String): SignUpResponse
    }

    type Query {
        getAuthById(authId: ID): Auth
        getAll: [Auth]
        currentAuth: CurrentAuthResponse
    }
`);

export default authTypeDefs;
