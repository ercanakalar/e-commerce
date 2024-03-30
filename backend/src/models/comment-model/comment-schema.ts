import { buildSchema } from 'graphql';

const profileTypeDefs = buildSchema(`
    type Comment {
        authId: Int
        productId: Int
        comment: String
    }

    type CommentResponse {
        message: String
        data: Comment
    }

    type Mutation {
        createComment(productId: Int, comment: String): CommentResponse
    }
`);

export default profileTypeDefs;
