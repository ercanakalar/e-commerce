import { Request, Response } from 'express';

import { Database } from '../../config/db';
import { ICommentUpdate } from '../../types/comment/comment.interface';
import { BadRequestError } from '../../errors';

const updateComment = async (args: ICommentUpdate, req: Request, res: Response) => {
  const { commentId, comment } = args;

  let queryText = `
    UPDATE comments
    SET comment = $2
    WHERE id = $1
    RETURNING *
  `;
  const values = [commentId, comment];
  const updateComment = await new Database().query(queryText, values);

  if (updateComment?.rows.length === 0 || !updateComment) {
    throw new BadRequestError('Error updating comment!');
  }
  const updateCommentRow = updateComment.rows[0];

  return {
    message: 'Comment created successfully!',
    data: {
        authId: updateCommentRow.auth_id,
        productId: updateCommentRow.product_id,
        comment: comment,
    },
  };
};

export default updateComment;
