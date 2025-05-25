import { Request, Response } from 'express';
import { IAddress } from '../../types/address';
import { Database } from '../../config/db';

const createAddress = async (args: IAddress, req: Request, res: Response) => {
  const { firstName, lastName, phoneNumber, city, state, address, addressTitle } = args;
  const authId = req.currentAuth?.id

  let queryText = `
    INSERT INTO address 
    (auth_id, first_name, last_name, phone_number, city, state, address, address_title) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
  `
  const values = [authId, firstName, lastName, phoneNumber, city, state, address, addressTitle];
  await new Database().query(queryText, values);
  
  return {
    message: 'Address created successfully',
    data: {
      authId: authId,
      firstName: args.firstName,
      lastName: args.lastName,
      phoneNumber: args.phoneNumber,
      city: args.city,
      state: args.state,
      address: args.address,
      addressTitle: args.addressTitle,
    },
  };
};

export default createAddress;
