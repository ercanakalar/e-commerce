import { NextFunction, Request, Response } from 'express';

import { IReviewOfProduct } from '../types/review/review.interface';
import { Database } from '../config/db';
import { BadRequestError } from '../errors';

const protectReview = async (args: { reviewId: number }, req: Request, res: Response, next: NextFunction) => {
  const { reviewId } = args;
  
  const authId = req.currentAuth!.id 

  let queryText = `
    SELECT auth_id FROM reviews WHERE id = $1
  `;
  const values = [reviewId];
  const updateReview = await new Database().query(queryText, values);

  if (updateReview?.rows.length === 0 || !updateReview) {
    throw new BadRequestError('Error updating review!');
  }
  const updateReviewRow = updateReview.rows[0];
  if (updateReviewRow.auth_id !== authId) {
    throw new BadRequestError('You are not allowed to change this review!')
  }
  next();
};

export { protectReview };
