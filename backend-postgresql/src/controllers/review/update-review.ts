import { Request, Response } from 'express';

import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';
import { IReviewUpdate } from '../../types/review/review.interface';
import { ReviewManager } from '../../utils/review-manager';

const updateReview = async (args: IReviewUpdate, req: Request, res: Response) => {
  const { reviewId, comment, rate } = args;

  let queryText = `
    UPDATE reviews
    SET comment = $2, rate = COALESCE($3, rate), updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;
  const values = [reviewId, comment, rate];
  const updateReview = await new Database().query(queryText, values);

  if (updateReview?.rows.length === 0 || !updateReview) {
    throw new BadRequestError('Error updating review!');
  }
  const updateReviewRow = updateReview.rows[0];
  if (updateReviewRow.auth_id !== req.currentAuth!.id) {
    throw new BadRequestError('You cannot change this review!')
  }

  await new ReviewManager().updateProductRating(updateReviewRow.product_id);

  return {
    message: 'Review created successfully!',
    data: {
        authId: updateReviewRow.auth_id,
        productId: updateReviewRow.product_id,
        comment,
        rate,
        firstName: updateReviewRow.first_name,
        lastName: updateReviewRow.last_name
    },
  };
};

export default updateReview;
