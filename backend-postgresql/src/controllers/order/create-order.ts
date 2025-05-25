import { Request, Response } from 'express';

import { IOrder, IOrderDatabase } from '../../types/order/order.interface';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const createOrder = async (args: IOrder, req: Request, res: Response) => {
  const { productId, addressId, quantity, totalPrice } = args;
  const authId = req.currentAuth?.id;

  let queryText = `INSERT INTO ordering (auth_id, product_id, address_id, quantity, total_price, status) VALUES ($1, $2, $3, $4, $5, 'preparing') RETURNING *`;
  let values = [authId, productId, addressId, quantity, totalPrice];
  const order = await new Database().query(queryText, values);

  if (!order) {
    throw new BadRequestError('Order not created');
  }

  const orderRow: IOrderDatabase = order.rows[0];

  return {
    message: 'Order created successfully',
    data: {
      productId: orderRow.product_id,
      addressId: orderRow.address_id,
      quantity: orderRow.quantity,
      totalPrice: orderRow.total_price,
      status: orderRow.status,
      createdAt: orderRow.created_at,
    },
  };
};

export default createOrder;
