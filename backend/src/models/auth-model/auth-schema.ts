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

    type GetAll {
        id: ID
        firstName: String
        lastName: String
        email: String
        role: String
        createdAt: String
        updatedAt: String
    }

    type GetAllResponse {
        message: String
        data: [GetAll]
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
    type ForgotPasswordResponse {
        message: String
        data: String
    }
    
    type Mutation {
        signUp(firstName: String, lastName: String, email: String, password: String, confirmPassword: String): SignUpResponse
        signIn(email: String, password: String): SignUpResponse
        signOut: String
        updatePassword(currentPassword: String, newPassword: String, confirmNewPassword: String): String
        forgotPassword(email: String): ForgotPasswordResponse
        resetPassword(token: String, newPassword: String, confirmNewPassword: String): SignUpResponse
    }

    type Query {
        getAuthById(authId: ID): Auth
        getAll: GetAllResponse
        currentAuth: CurrentAuthResponse
    }
`);

export default authTypeDefs;
