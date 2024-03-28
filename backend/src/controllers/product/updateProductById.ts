import { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { IProductUpdate } from '../../types/product/product.interface';
import { Database } from '../../config/db';

const updateProductById = async (
  args: IProductUpdate,
  req: Request,
  res: Response
) => {
  const { id, price, discount, description, stock, images, shipping } = args;

  let queryText =
    'UPDATE product SET description = $1, price = $2, discount = $3, stock = $4, images = $5, shipping = $6, updated_at = CURRENT_TIMESTAMP  WHERE id = $7';
  await new Database().query(queryText, [
    description,
    price,
    discount,
    stock,
    images,
    shipping,
    id,
  ]);

  queryText = 'SELECT * FROM product WHERE id = $1';
  const updatedProduct = await new Database().query(queryText, [id]);
  if(!updatedProduct) {
    throw new NotFoundError('Product not found!');
  }
  const updatedProductRow = updatedProduct.rows[0];

  return {
    message: 'Product updated successfully!',
    data: {
      id: updatedProductRow.id,
      price: updatedProductRow.price,
      discount: updatedProductRow.discount,
      description: updatedProductRow.description,
      stock: updatedProductRow.stock,
      images: updatedProductRow.images,
      shipping: updatedProductRow.shipping,
    },
  };
};

export { updateProductById };
