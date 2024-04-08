export interface IReview {
    productId: number;
    comment: string;
    rate: number
}

export interface IReviewUpdate {
    reviewId: number;
    comment: string;
    rate: number
}