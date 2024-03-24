import { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { IProductGetId } from '../../types/product/product.interface';
import { Database } from '../../config/db';

const getProductById = async (
  args: IProductGetId,
  req: Request,
  res: Response
) => {
  let queryText = 'SELECT * FROM product WHERE id = $1';
  const product = await new Database().query(queryText, [args.id]);

  if (!product) {
    throw new NotFoundError('Product not found!');
  }
  const productRow = product.rows[0];

  return {
    message: 'Product found!',
    data: {
      authId: productRow.auth_id,
      category: productRow.category_id,
      subCategory: productRow.category_sub_id,
      group: productRow.category_group_id,
      children: productRow.category_children_id,
      name: productRow.name,
      price: productRow.price,
      description: productRow.description,
      rating: productRow.rating,
      stock: productRow.stock,
      sold: productRow.sold,
      image: productRow.images,
      shipping: productRow.shipping,
      brand: productRow.brand,
    },
  };
};

export { getProductById };
