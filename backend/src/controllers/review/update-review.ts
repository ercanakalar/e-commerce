import { Request, Response } from 'express';

import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';
import { IReviewUpdate } from '../../types/comment/comment.interface';

const updateReview = async (args: IReviewUpdate, req: Request, res: Response) => {
  const { reviewId, comment, rate } = args;

  let queryText = `
    UPDATE reviews
    SET comment = $2, rate: $3
    WHERE id = $1
    RETURNING *
  `;
  const values = [reviewId, comment, rate];
  const updateReview = await new Database().query(queryText, values);

  if (updateReview?.rows.length === 0 || !updateReview) {
    throw new BadRequestError('Error updating review!');
  }
  const updateReviewRow = updateReview.rows[0];

  return {
    message: 'Review created successfully!',
    data: {
        authId: updateReviewRow.auth_id,
        productId: updateReviewRow.product_id,
        comment,
        rate
    },
  };
};

export default updateReview;
