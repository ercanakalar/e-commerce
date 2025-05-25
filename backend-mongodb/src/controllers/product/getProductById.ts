import { Request, Response } from 'express';
import { Product } from '../../models/product-model/product-model';
import { NotFoundError } from '../../errors';
import { IProductGetId } from '../../types/product/product.interface';

const getProductById = async (
  args: IProductGetId,
  req: Request,
  res: Response
) => {
  const product = await Product.findById(args.id);

  if (!product) {
    throw new NotFoundError('Product not found!');
  }

  return {
    message: 'Product found!',
    data: {
      authId: product.authId,
      category: product.category,
      subCategory: product.subCategory,
      group: product.group,
      children: product.children,
      name: product.name,
      price: product.price,
      description: product.description,
      rating: product.rating,
      stock: product.stock,
      sold: product.sold,
      image: product.images,
      shipping: product.shipping,
      brand: product.brand,
    },
  };
};

export { getProductById };
