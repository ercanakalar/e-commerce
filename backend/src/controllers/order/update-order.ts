import { Request, Response } from 'express';

import { IOrderUpdate } from '../../types/order/order.interface';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const updateOrder = async (args: IOrderUpdate, req: Request, res: Response) => {
  const { orderId, status } = args;

  let queryText = `UPDATE ordering SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`;
  let values = [status, orderId];
  const order = await new Database().query(queryText, values);

  if (!order) {
    throw new BadRequestError('Order not updated');
  }

  const orderRow = order.rows[0];

  return {
    message: 'Order updated successfully',
    data: {
      status: orderRow.status,
    },
  };
};

export default updateOrder;
