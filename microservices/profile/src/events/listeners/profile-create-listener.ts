import { QueryResult } from 'pg';
import { Listener } from '../../../../common/src/events/base-listener';
import { ProfileCreateEvent } from '../../../../common/src/events/profile/create-profile-event';
import { Subjects } from '../../../../common/src/events/subjects';
import { Database } from '../../config/db';
import { BadRequestError } from '../../../../common/src/errors/bad-request-error';

export class ProfileCreateListener extends Listener<ProfileCreateEvent> {
  readonly subject = Subjects.ProfileCreated;

  async onMessage(data: ProfileCreateEvent['data'], msg: { ack: () => void }) {
    const { id, email, firstName, lastName, role, iat } = data;

    try {
      let queryText = `SELECT * FROM profile WHERE auth_id = $1;`;

      const profile: QueryResult<any> | undefined = await new Database().query(
        queryText,
        [id]
      );

      if (profile) {
        return
      }
      queryText = `
              INSERT INTO profile (auth_id, created_at)
              VALUES ($1, $2)
              RETURNING *;`;

      const newProfile: QueryResult<any> | undefined =
        await new Database().query(queryText, [id, new Date()]);

      if (!newProfile) {
        throw new BadRequestError('Profile not created!');
      }
    } catch (error) {
      throw new BadRequestError('Failed to create profile');
    }

    msg.ack();
  }
}
