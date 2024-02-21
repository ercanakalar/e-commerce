import { buildSchema } from 'graphql';

const authTypeDefs = buildSchema(`
    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
    }
    type SignUpResponse {
        message: String
        data: User
        token: String
    }
    
    type CurrentUser {
        id: ID
        email: String
    }
    type CurrentUserResponse {
        message: String
        data: CurrentUser
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
        getUserById(userId: ID): User
        getAllUsers: [User]
        currentUser: CurrentUserResponse
    }
`);

export default authTypeDefs;
