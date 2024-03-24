import { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { Database } from '../../config/db';

const getProducts = async (req: Request, res: Response) => {
  let queryText = 'SELECT * FROM product WHERE status != $1';
  const products = await new Database().query(queryText, ['processing']);

  if (products?.rows.length === 0) {
    throw new NotFoundError('Products not found');
  }

  const data = products?.rows.map((product) => {
    return {
      authId: product.auth_id,
      category: product.category_id,
      subCategory: product.category_sub_id,
      group: product.category_group_id,
      children: product.category_children_id,
      name: product.name,
      price: product.price,
      description: product.description,
      rating: product.rating,
      stock: product.stock,
      sold: product.sold,
      images: product.images,
      shipping: product.shipping,
      brand: product.brand,
    };
  });

  return {
    message: 'Products found!',
    data,
  };
};

export { getProducts };
