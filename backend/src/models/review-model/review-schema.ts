import { buildSchema } from 'graphql';

const reviewTypeDefs = buildSchema(`
    type Review {
        authId: Int
        productId: Int
        comment: String
        rate: Int
    }

    type ReviewResponse {
        message: String
        data: Review
    }
    type ReviewGetResponse {
        message: String
        data: [Review]
    }

    type Mutation {
        createReview(productId: Int, comment: String, rate: Int): ReviewResponse
        updateReview(reviewId: Int, comment: String, rate: Int): ReviewResponse
    }
    type Query {
        getReviewsByProductId(productId: Int): ReviewGetResponse
    }
`);

export default reviewTypeDefs;
