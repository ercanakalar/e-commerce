import { Request, Response } from 'express';

import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';

const getAllAuths = async (req: Request, res: Response) => {
  let queryText = 'SELECT * FROM auth';
  const allAuths = await new Database().query(queryText);

  if (!allAuths) {
    throw new BadRequestError('No auths found!');
  }
  
  const data = allAuths.rows.map((auth: any) => {
    return {
      id: auth.id,
      firstName: auth.first_name,
      lastName: auth.last_name,
      email: auth.email,
      role: auth.role,
      createdAt: auth.created_at,
      updatedAt: auth.updated_at,
    };
  });

  return {
    message: 'All auths fetched successfully!',
    data
  };
};

export default getAllAuths;
