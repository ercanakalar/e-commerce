import { Request, Response } from 'express';
import { IProduct } from '../../types/product/product.interface';
import { BadRequestError } from '../../errors';
import { Database } from '../../config/db';

const createProduct = async (
  args: IProduct,
  authId: number,
  req: Request,
  res: Response
) => {
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
    let queryText = 'SELECT * FROM category WHERE id = $1';
    const theCategory = await new Database().query(queryText, [category]);
    if (!theCategory) {
      throw new BadRequestError('Category not found');
    }
    queryText = 'SELECT * FROM category_sub WHERE id = $1';
    const theSubcategory = await new Database().query(queryText, [subCategory]);
    if (!theSubcategory) {
      throw new BadRequestError('Sub Category not found');
    }
    queryText = 'SELECT * FROM category_group WHERE id = $1';
    const theGroup = await new Database().query(queryText, [group]);
    if (!theGroup) {
      throw new BadRequestError('Group not found');
    }
    queryText = 'SELECT * FROM category_children WHERE id = $1';
    const theChildren = await new Database().query(queryText, [children]);
    if (!theChildren) {
      throw new BadRequestError('Children not found');
    }

    queryText = `
      INSERT INTO product (auth_id, category_id, category_sub_id, category_group_id, category_children_id, name, price, description, stock, images, shipping, brand, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;
    const values = [
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
      'processing',
    ];
    const savedProduct = await new Database().query(queryText, values);

    if (!savedProduct) {
      throw new BadRequestError('Failed to create product');
    }

    const savedProductRow = savedProduct.rows[0];

    return {
      message: 'Product created successfully!',
      data: {
        authId: savedProductRow.auth_id,
        category: savedProductRow.category_id,
        subCategory: savedProductRow.category_sub_id,
        group: savedProductRow.category_group_id,
        children: savedProductRow.category_children_id,
        name: savedProductRow.name,
        price: savedProductRow.price,
        description: savedProductRow.description,
        stock: savedProductRow.stock,
        image: savedProductRow.images,
        shipping: savedProductRow.shipping,
        brand: savedProductRow.brand,
      },
    };
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};

export { createProduct };
