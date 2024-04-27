import { Request, Response } from 'express';

import { IBasket, IBasketDatabase } from '../../types/basket/basket.interface';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const addBasket = async (args: IBasket, req: Request, res: Response) => {
  const { productId, quantity } = args;
  const authId = Number(req.currentAuth?.id);

  let queryText = `
    INSERT INTO basket (auth_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  let values = [authId, productId, quantity];
  const newBasket = await new Database().query(queryText, values);

  if (newBasket?.rows.length === 0) {
    throw new BadRequestError('Unable to add product to basket');
  }

  const newBasketRow = newBasket?.rows[0] as IBasketDatabase;

  return {
    message: 'Add product to basket',
    data: {
      id: newBasketRow.id,
      authId: newBasketRow.auth_id,
      productId: newBasketRow.product_id,
      quantity: newBasketRow.quantity,
    },
  };
};

export default addBasket;
