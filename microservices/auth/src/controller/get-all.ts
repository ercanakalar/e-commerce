import { Request, Response } from 'express';

import { Database } from '../config/db';

import { BadRequestError } from '../../../common/src/errors';

const getAllAuths = async (req: Request, res: Response) => {
  try {
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

    res.status(200).json({
      message: 'All auths fetched successfully!',
      data,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default getAllAuths;
