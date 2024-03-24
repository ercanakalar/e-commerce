import { Request, Response } from 'express';

import { NotFoundError } from '../../errors';
import { ICurrentAuthBasicInfo } from '../../types/auth/authModalType';
import { Database } from '../../config/db';

const getOwnProfile = async (currentAuth: ICurrentAuthBasicInfo, req: Request, res: Response) => {
  let queryText = `SELECT * FROM profile WHERE auth_id = $1`;
  const profile = await new Database().query(queryText, [currentAuth.id]);

  if (!profile) {
    throw new NotFoundError('Profile not found');
  }

  const findProfileRow = profile.rows[0];

  return {
    message: 'Profile found!',
    data: {
      id: findProfileRow.id,
      authId: findProfileRow.auth_id,
      address: findProfileRow.address,
      phone: findProfileRow.phone,
      photo: findProfileRow.photo,
    },
  };
};

export { getOwnProfile };
