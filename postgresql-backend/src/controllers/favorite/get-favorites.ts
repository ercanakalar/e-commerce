import { Request, Response } from 'express';
import { Database } from '../../config/db';

export const getFavorites = async (req: Request, res: Response) => {
  const authId = req.currentAuth!.id;

  let queryText = `SELECT * FROM favorite WHERE auth_id = $1`;
  let values = [authId];
  const favorites = await new Database().query(queryText, values);

  if (favorites?.rows[0]?.products.length < 1) {
    return {
      message: 'No favorites found',
      data: {
        authId,
        products: [],
      },
    };
  }

  const favoriteRow = favorites!.rows[0];

  return {
    message: 'Favorites found',
    data: {
      authId,
      products: favoriteRow.products ?? [],
    },
  };
};
