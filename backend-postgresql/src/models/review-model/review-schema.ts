import { buildSchema } from 'graphql';

const reviewTypeDefs = buildSchema(`
    type Review {
        authId: Int
        productId: Int
        comment: String
        rate: Int
        firstName: String
        lastName: String
    }

    type ReviewResponse {
        message: String
        data: Review
    }
    type ReviewGetReviewByProductIdResponse {
        message: String
        averageRate: Float
        data: [Review]
    }

    type Mutation {
        createReview(productId: Int, comment: String, rate: Int): ReviewResponse
        updateReview(reviewId: Int, comment: String, rate: Int): ReviewResponse
        getReviewsByProductId(productId: Int): ReviewGetReviewByProductIdResponse
    }
`);

export default reviewTypeDefs;
