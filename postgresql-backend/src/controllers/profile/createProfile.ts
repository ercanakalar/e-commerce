import { Request, Response } from 'express';

import { ICurrentAuthBasicInfo } from '../../types/auth/authModalType';
import { Database } from '../../config/db';
import { QueryResult } from 'pg';

const createProfile = async (
  args: ICurrentAuthBasicInfo,
  req: Request,
  res: Response
) => {
  const authId = req.currentAuth?.id;

  const queryText = `
            INSERT INTO profile (auth_id, created_at)
            VALUES ($1, $2)
            RETURNING *;`;

  const newProfile: QueryResult<any> |undefined = await new Database().query(queryText, [
    authId,
    new Date(),
  ]);

  if (!newProfile) {
    return {
      message: 'Profile not created!',
      data: null,
    };
  }

  const newProfileRow = newProfile.rows[0];

  return {
    message: 'Profile created successfully!',
    data: {
      id: newProfileRow.id,
      authId: newProfileRow.authId,
    },
  };
};

export { createProfile };
