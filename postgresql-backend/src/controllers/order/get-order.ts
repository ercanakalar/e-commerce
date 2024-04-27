import { Request, Response } from 'express';

import { IOrderId } from '../../types/order/order.interface';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';
import { create } from 'domain';

const getOrder = async (args: IOrderId, req: Request, res: Response) => {
  const { orderId } = args;

  let queryText = `SELECT * FROM ordering WHERE id = $1`;
  let values = [orderId];
  const order = await new Database().query(queryText, values);

  if (!order) {
    throw new BadRequestError('Order not found');
  }

  const orderRow = order.rows[0];

  return {
    message: 'Order retrieved successfully',
    data: {
      productId: orderRow.product_id,
      addressId: orderRow.address_id,
      quantity: orderRow.quantity,
      orderStatus: orderRow.order_status,
      totalPrice: orderRow.total_price,
      status: orderRow.status,
      createdAt: orderRow.created_at,
    },
  };
};

export default getOrder;
