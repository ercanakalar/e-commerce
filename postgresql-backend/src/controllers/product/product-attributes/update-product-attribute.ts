import { Request, Response } from 'express';

import { IUpdateProductAttribute } from '../../../types/product/product-attributes.interface';
import { Database } from '../../../config/db';
import { BadRequestError } from '../../../errors';

const updateProductAttribute = async (args: IUpdateProductAttribute, req: Request, res: Response) => {
    const { attributeId, attributeKey, attributeValue  } = args;

    let queryText = `UPDATE product_attributes SET attribute_key = $1, attribute_value = $2 WHERE id = $3 RETURNING *`;
    let values = [attributeKey, attributeValue, attributeId];

    try {
        const editAttribute = await new Database().query(queryText, values);
        if (!editAttribute) {
            throw new BadRequestError('Please provide a product id');
        }
    
        return {
            message: 'Product attribute updated successfully',
        }
    } catch (error) {
        throw error;
    }
};

export { updateProductAttribute };
