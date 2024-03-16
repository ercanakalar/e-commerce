import { Request, Response } from 'express';
import { Product } from '../../models/product-model/product-model';
import { NotFoundError } from '../../errors';
import { IProductUpdate } from '../../types/product/product.interface';

const updateProductById = async (
  args: IProductUpdate,
  req: Request,
  res: Response
) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: args.id },
    {
      description: args.description,
      price: args.price,
      stock: args.stock,
      images: args.images,
      shipping: args.shipping,
    }
  );

  if (!updatedProduct) {
    throw new NotFoundError('Product could not be updated!');
  }

  return {
    message: 'Product updated successfully!',
    data: {
      id: updatedProduct.id,
      price: updatedProduct.price,
      description: updatedProduct.description,
      stock: updatedProduct.stock,
      image: updatedProduct.images,
      shipping: updatedProduct.shipping,
    },
  };
};

export { updateProductById };
