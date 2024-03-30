import { buildSchema } from 'graphql';

const commentTypeDefs = buildSchema(`
    type Comment {
        authId: Int
        productId: Int
        comment: String
    }

    type CommentResponse {
        message: String
        data: Comment
    }
    type CommentGetResponse {
        message: String
        data: [Comment]
    }

    type Mutation {
        createComment(productId: Int, comment: String): CommentResponse
        updateComment(commentId: Int, comment: String): CommentResponse
    }
    type Query {
        getCommentsByProductId(productId: Int): CommentGetResponse
    }
`);

export default commentTypeDefs;
