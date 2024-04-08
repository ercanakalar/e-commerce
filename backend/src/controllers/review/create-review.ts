import { Request, Response } from 'express';

import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';
import { IReview } from '../../types/comment/comment.interface';

const createReview = async (args: IReview, req: Request, res: Response) => {
  const { productId, comment, rate } = args;
  const authId = req.currentAuth?.id;

  let queryText = `
    INSERT INTO reviews 
    (auth_id, product_id, comment, rate) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;
  const values = [authId, productId, comment, rate];
  const newReview = await new Database().query(queryText, values);

  if (newReview?.rows.length === 0) {
    throw new BadRequestError('Error creating review!');
  }

  return {
    message: 'Review created successfully!',
    data: {
      authId,
      productId,
      comment,
      rate
    },
  };
};

export default createReview;
