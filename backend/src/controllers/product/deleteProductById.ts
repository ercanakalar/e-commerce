import { Request, Response } from 'express';
import { Product } from '../../models/product-model/product-model';
import { NotFoundError } from '../../errors';
import { IProductDeleteId } from '../../types/product/product.interface';

const deleteProductById = async (
  args: IProductDeleteId,
  req: Request,
  res: Response
) => {
  const product = await Product.findByIdAndDelete({ _id: args.id });

  if (!product) {
    throw new NotFoundError('Product not found!');
  }

  return {
    message: 'Product deleted successfully!',
  };
};

export { deleteProductById };
