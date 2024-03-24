import { Request, Response } from 'express';

import { IProfile } from '../../types/profile/profileModalTypes';
import { BadRequestError } from '../../errors';
import { ICurrentAuthBasicInfo } from '../../types/auth/authModalType';
import { Database } from '../../config/db';

const updateProfile = async (
  currentAuth: ICurrentAuthBasicInfo,
  args: IProfile,
  req: Request,
  res: Response
) => {
  const { id } = currentAuth;
  const { address, phone, photo } = args;  

  let queryText = 'SELECT * FROM profile WHERE auth_id = $1';
  const findProfile = await new Database().query(queryText, [id]);

  if (!findProfile) {
    throw new BadRequestError('Profile not found');
  }

  const findProfileRow = findProfile.rows[0];

  queryText = `UPDATE profile SET address = $1, phone = $2, photo = $3, updated_at = CURRENT_TIMESTAMP WHERE auth_id = $4`;
  await new Database().query(queryText, [
    address || findProfileRow.address,
    phone || findProfileRow.phone,
    photo || findProfileRow.photo,
    id,
  ]);

  return {
    message: 'Profile updated successfully!',
    data: {
      id: findProfileRow.id,
      authId: findProfileRow.auth_id,
      address: address || findProfileRow.address,
      phone: phone || findProfileRow.phone,
      photo: photo || findProfileRow.photo,
    },
  };
};

export { updateProfile };
