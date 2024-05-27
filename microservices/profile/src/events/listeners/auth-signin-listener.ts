import { QueryResult } from 'pg';
import { Listener } from '../../../../common/src/events/base-listener';
import { AuthConnectedEvent } from '../../../../common/src/events/auth/auth-connect-event';
import { Subjects } from '../../../../common/src/events/subjects';
import { Database } from '../../config/db';
import { BadRequestError } from '../../../../common/src/errors/bad-request-error';
import { PasswordManager } from '../../../../common/src/utils';

export class AuthSignInListener extends Listener<AuthConnectedEvent> {
  readonly subject = Subjects.AuthConnected;

  async onMessage(data: AuthConnectedEvent['data'], msg: { ack: () => void }) {
    const { id, email, firstName, lastName, role, iat } = data;

    const expireToken = await PasswordManager.hashExpireToken(process.env.PROFILE_JWT_EXPIRES_IN!);

    try {
      let queryText = `SELECT * FROM profile WHERE auth_id = $1;`;

      const profile: QueryResult<any> | undefined = await new Database().query(
        queryText,
        [id]
      );

      if (!profile) {
        return {
          message: 'Profile not created!',
          data: null,
        };
      }

      queryText = `UPDATE profile SET expire_token= $1 WHERE auth_id = $2 RETURNING *;`;
      const expiredProfile = await new Database().query(queryText, [
        expireToken,
        id,
      ]);

      if (!expiredProfile) {
        throw new BadRequestError('Failed to update profile');
      }
    } catch (error) {
      throw new BadRequestError('Failed to create profile');
    }

    msg.ack();
  }
}
