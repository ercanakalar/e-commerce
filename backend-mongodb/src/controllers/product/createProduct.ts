import { Request, Response } from 'express';
import { IProduct } from '../../types/product/product.interface';
import { BadRequestError } from '../../errors';
import { Category } from '../../models/category-model/category-model';
import { SubCategory } from '../../models/category-model/sub-category-model/sub-category-model';
import { CategoryGroup } from '../../models/category-model/category-group-model/category-group-model';
import { CategoryChildren } from '../../models/category-model/category-children-model/category-children-model';
import { Product } from '../../models/product-model/product-model';

const createProduct = async (args: IProduct, authId: string, req: Request, res: Response) => {
  const {
    category,
    subCategory,
    group,
    children,
    name,
    price,
    description,
    stock,
    images,
    shipping,
    brand,
  } = args;

  try {
    const theCategory = await Category.findById({ _id: category });
    if (!theCategory) {
      throw new BadRequestError('Category not found');
    }
    const theSubcategory = await SubCategory.findById({ _id: subCategory });
    if (!theSubcategory) {
      throw new BadRequestError('Sub Category not found');
    }
    const theGroup = await CategoryGroup.findById({ _id: group });
    if (!theGroup) {
      throw new BadRequestError('Group not found');
    }
    const theChildren = await CategoryChildren.findById({ _id: children });
    if (!theChildren) {
      throw new BadRequestError('Children not found');
    }
    const newProduct = new Product({
      authId,
      category,
      subCategory,
      group,
      children,
      name,
      price,
      description,
      stock,
      images,
      shipping,
      brand,
      status: 'processing'
    });

    const savedProduct = await newProduct.save();

    return {
      message: 'Product created successfully!',
      data: {
        authId: savedProduct.authId,
        category: savedProduct.category,
        subCategory: savedProduct.subCategory,
        group: savedProduct.group,
        children: savedProduct.children,
        name: savedProduct.name,
        price: savedProduct.price,
        description: savedProduct.description,
        stock: savedProduct.stock,
        image: savedProduct.images,
        shipping: savedProduct.shipping,
        brand: savedProduct.brand,
      },
    };
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};

export { createProduct };
