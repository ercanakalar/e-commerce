import { Request, Response } from 'express';

import { IProductAttributes } from '../../../types/product/product-attributes.interface';
import { Database } from '../../../config/db';
import { BadRequestError } from '../../../errors';

const createProductAttribute = async (args: IProductAttributes, req: Request, res: Response) => {
    const { productId, attributeKey, attributeValue } = args;

    let queryText = `INSERT INTO product_attributes (product_id, attribute_key, attribute_value) VALUES ($1, $2, $3) RETURNING *`;
    let values = [productId, attributeKey, attributeValue];

    try {
        const newProductAttributes = await new Database().query(queryText, values);

        if(!newProductAttributes) {
            throw new BadRequestError('Error creating product attributes');
        }

        return {
            message: 'Product attribute created successfully!',
        }
    } catch (error) {
        throw error;
    }
};

export { createProductAttribute };
