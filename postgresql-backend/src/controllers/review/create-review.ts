import { Request, Response } from 'express';

import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';
import { IReview } from '../../types/review/review.interface';
import { ReviewManager } from '../../utils/review-manager';

const createReview = async (args: IReview, req: Request, res: Response) => {
  const { productId, comment, rate } = args;

  const authId = req.currentAuth?.id;
  const firstName = req.currentAuth?.firstName;
  const lastName = req.currentAuth?.lastName;

  let queryText = `
    INSERT INTO reviews 
    (auth_id, product_id, comment, rate, first_name, last_name) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *
  `;
  const values = [authId, productId, comment, rate, firstName, lastName];
  const newReview = await new Database().query(queryText, values);

  if (newReview?.rows.length === 0) {
    throw new BadRequestError('Error creating review!');
  }

  await new ReviewManager().updateProductRating(productId);
  
  return {
    message: 'Review created successfully!',
    data: {
      authId,
      productId,
      comment,
      rate,
      firstName,
      lastName
    },
  };
};

export default createReview;
