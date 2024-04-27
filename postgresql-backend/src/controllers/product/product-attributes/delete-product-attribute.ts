import { Request, Response } from 'express';

import { IDeleteProductAttributeById } from '../../../types/product/product-attributes.interface';
import { Database } from '../../../config/db';
import { BadRequestError } from '../../../errors';

const deleteProductAttribute = async (args: IDeleteProductAttributeById, req: Request, res: Response) => {
    const { attributeId  } = args;

    let queryText = `DELETE FROM product_attributes WHERE id = $1 RETURNING *`;
    let values = [attributeId];

    try {
        const deletedAttribute = await new Database().query(queryText, values);
        if (!deletedAttribute) {
            throw new BadRequestError('Please provide a product id');
        }
    
        return {
            message: 'Product attribute deleted successfully',
        }
    } catch (error) {
        throw error;
    }
};

export { deleteProductAttribute };
