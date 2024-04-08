import { Request, Response } from 'express';

import { IReviewDatabase, IReviewOfProduct } from '../../types/review/review.interface';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const getReviewsByProductId = async (args: IReviewOfProduct, req: Request, res: Response) => {
  const { productId } = args;

  let queryText = `SELECT * FROM reviews WHERE product_id = $1`;
  const values = [productId];
  const reviews = await new Database().query(queryText, values);

  if (!reviews) {
    throw new BadRequestError('Error getting reviews!');
  }

  const reviewsRow: IReviewDatabase[] = reviews.rows;
  
  const averageRate = reviewsRow.reduce((sum: number, review: IReviewDatabase) => sum + review.rate, 0) / reviewsRow.length;
  const roundedAverageRate = averageRate.toFixed(2)
  
  const data = reviewsRow.map((review) => {
    return {
        authId: review.auth_id,
        productId: review.product_id,
        comment: review.comment,
        rate: review.rate,
        firstName: review.first_name,
        lastName: review.last_name
    };
  });

  return {
    message: 'Get successfully all reviews of the product!',
    averageRate: roundedAverageRate,
    data
  };
};

export default getReviewsByProductId;
