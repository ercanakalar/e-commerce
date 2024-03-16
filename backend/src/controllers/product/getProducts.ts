import { Request, Response } from 'express';
import { Product } from '../../models/product-model/product-model';
import { NotFoundError } from '../../errors';

const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({ status: { $ne: 'processing' } });

  if (products.length === 0) {
    throw new NotFoundError('Products not found');
  }

  const data = products.map((product) => {
    return {
      userId: product.userId,
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
