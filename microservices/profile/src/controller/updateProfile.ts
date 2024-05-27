import { Request, Response } from 'express';

import { Database } from '../config/db';

import { AuthPayload } from '../../../common/src/types/auth/authPayload';
import { BadRequestError } from '../../../common/src/errors/bad-request-error';

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { address, phone, photo } = req.body;
    const { id } = req.currentAuth as AuthPayload;

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

    res.status(200).send({
      message: 'Profile updated successfully!',
      data: {
        id: findProfileRow.id,
        authId: findProfileRow.auth_id,
        address: address || findProfileRow.address,
        phone: phone || findProfileRow.phone,
        photo: photo || findProfileRow.photo,
      },
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export { updateProfile };
