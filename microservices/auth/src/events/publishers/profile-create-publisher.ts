import { Publisher } from '../../../../common/src/events/base-publisher';
import { ProfileCreateEvent } from '../../../../common/src/events/profile/create-profile-event';
import { Subjects } from '../../../../common/src/events/subjects';

export class ProfileCreatePublisher extends Publisher<ProfileCreateEvent> {
  subject: Subjects.ProfileCreated = Subjects.ProfileCreated;
}
