import { Request, Response } from 'express';
import { Database } from '../config/db';
import { AuthPayload } from '../../../common/src/types/auth/authPayload';
import { NotFoundError } from '../../../common/src/errors/not-found-error';

const getOwnProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.currentAuth as AuthPayload;
    let queryText = `SELECT * FROM profile WHERE auth_id = $1`;
    const profile = await new Database().query(queryText, [id]);

    if (profile?.rows.length === 0 || !profile) {
      throw new NotFoundError('Profile not found');
    }

    const findProfileRow = profile.rows[0];

    res.status(200).send({
      message: 'Profile found!',
      data: {
        id: findProfileRow.id,
        authId: findProfileRow.auth_id,
        address: findProfileRow.address,
        phone: findProfileRow.phone,
        photo: findProfileRow.photo,
      },
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export { getOwnProfile };
