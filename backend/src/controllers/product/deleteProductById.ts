import { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { IProductDeleteId } from '../../types/product/product.interface';
import { Database } from '../../config/db';

const deleteProductById = async (
  args: IProductDeleteId,
  req: Request,
  res: Response
) => {
  const { id } = args;

  let queryText = 'SELECT * FROM product WHERE id = $1';
  const beforeDeleteProduct = await new Database().query(queryText, [id]);
  if(!beforeDeleteProduct?.rows[0]) {
    throw new NotFoundError('Product not found!');
  }

  queryText = 'DELETE FROM product WHERE id = $1';
  await new Database().query(queryText, [id]);

  queryText = 'SELECT * FROM product WHERE id = $1';
  const product = await new Database().query(queryText, [id]);

  if (product?.rows[0]) {
    throw new NotFoundError('Product could not be deleted!');
  }

  return {
    message: 'Product deleted successfully!',
  };
};

export { deleteProductById };
