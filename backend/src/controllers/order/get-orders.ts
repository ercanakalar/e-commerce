import { Request, Response } from 'express';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const getOrders = async (req: Request, res: Response) => {
  try {
    const authId = req.currentAuth?.id;
    const queryText = 'SELECT * FROM ordering WHERE auth_id = $1';
    const values = [authId];
    const orders = await new Database().query(queryText, values);

    if (!orders) {
      throw new BadRequestError('No orders found');
    }

    const data = orders.rows.map((order: any) => {
      return {
        productId: order.product_id,
        addressId: order.address_id,
        quantity: order.quantity,
        totalPrice: order.total_price,
        status: order.status,
        createdAt: order.created_at,
      };
    });

    return {
      message: 'Orders retrieved successfully',
      data,
    };
  } catch (error) {
    throw new BadRequestError(`Error: ${error}`);
  }
};

export default getOrders;
