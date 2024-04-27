import { Request, Response } from 'express';

import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';
import { IBasketDatabase } from '../../types/basket/basket.interface';

const getBaskets = async (req: Request, res: Response) => {
  const authId = Number(req.currentAuth?.id);

  let queryText = `
    SELECT product.id, product.images, product.name, product.price, basket.auth_id, basket.product_id, basket.quantity, SUM(product.price * basket.quantity) AS total_price
    FROM product
    JOIN basket ON product.id = basket.product_id
    WHERE basket.auth_id = $1
    GROUP BY product.id, product.images, product.name, product.price, basket.auth_id, basket.product_id, basket.quantity
  `;
  let values = [authId];
  const baskets = await new Database().query(queryText, values);

  if (baskets?.rows.length === 0) {
    throw new BadRequestError('No baskets found');
  }

  const data = baskets?.rows.map((basket: IBasketDatabase) => {
    return {
      id: basket.id,
      authId: basket.auth_id,
      productId: basket.product_id,
      quantity: basket.quantity,
      productName: basket.name,
      price: basket.price,
      images: basket.images,
      totalValue: basket.total_price,
    };
  });

  return {
    message: 'Get baskets',
    data,
  };
};

export default getBaskets;
