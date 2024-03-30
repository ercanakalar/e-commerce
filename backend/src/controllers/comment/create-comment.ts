import { Request, Response } from 'express';

import { Database } from '../../config/db';
import { IComment } from '../../types/comment/comment.interface';
import { BadRequestError } from '../../errors';

const createComment = async (args: IComment, req: Request, res: Response) => {
  const { productId, comment } = args;
  const authId = req.currentAuth?.id;
  console.log(args);
  

  let queryText = `
    INSERT INTO comments 
    (auth_id, product_id, comment) 
    VALUES ($1, $2, $3) 
    RETURNING *
  `;
  const values = [authId, productId, comment];
  const newComment = await new Database().query(queryText, values);

  if (newComment?.rows.length === 0) {
    throw new BadRequestError('Error creating comment!');
  }

  return {
    message: 'Comment created successfully!',
    data: {
      authId: authId,
      productId: productId,
      comment: comment,
    },
  };
};

export default createComment;
