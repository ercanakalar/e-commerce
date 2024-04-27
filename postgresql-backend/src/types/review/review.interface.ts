export interface IReviewDatabase {
  id: number;
  auth_id: number;
  product_id: number;
  comment: string;
  rate: number;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IReview {
  productId: number;
  comment: string;
  rate: number;
}

export interface IReviewUpdate {
  reviewId: number;
  comment: string;
  rate: number;
}

export interface IReviewOfProduct {
  productId: number;
}
