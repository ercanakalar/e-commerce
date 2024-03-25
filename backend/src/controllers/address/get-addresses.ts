import { Request, Response } from 'express';

import { Database } from '../../config/db';

const getAddress = async (req: Request, res: Response) => {
  const authId = req.currentAuth?.id;

  let queryText = `SELECT * FROM address WHERE auth_id = $1`;
  const allAddresses = await new Database().query(queryText, [authId]);

  if (!allAddresses?.rows) {
    return {
      message: 'No address found',
      data: {},
    };
  }

  const data = allAddresses.rows.map((address: any) => {
    return {
      authId: address.auth_id,
      firstName: address.first_name,
      lastName: address.last_name,
      phoneNumber: address.phone_number,
      city: address.city,
      state: address.state,
      address: address.address,
      addressTitle: address.address_title,
    };
  });

  return {
    message: 'Address listed successfully',
    data,
  };
};

export default getAddress;
