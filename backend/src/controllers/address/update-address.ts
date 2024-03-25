import { Request, Response } from 'express';

import { Database } from '../../config/db';
import { IAddress } from '../../types/address';
import { BadRequestError } from '../../errors';

const updateAddress = async (args: IAddress, req: Request, res: Response) => {
    const { firstName, lastName, phoneNumber, city, state, address, addressTitle } = args;
    const authId = req.currentAuth?.id;

    let queryText = `
        UPDATE address
        SET first_name = $1, last_name = $2, phone_number = $3, city = $4, state = $5, address = $6, address_title = $7
        WHERE auth_id = $8
        RETURNING *
    `;
    const values = [firstName, lastName, phoneNumber, city, state, address, addressTitle, authId];

    const updatedAddress = await new Database().query(queryText, values);

    if(updatedAddress?.rows.length === 0) {
        throw new BadRequestError('You are not authorized! Address not updated!')
    }

    return {
        message: 'Address updated successfully',
    };
};

export default updateAddress;
