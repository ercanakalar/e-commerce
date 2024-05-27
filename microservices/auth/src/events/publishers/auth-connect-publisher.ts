import { Publisher } from '../../../../common/src/events/base-publisher';
import { AuthConnectedEvent } from '../../../../common/src/events/auth/auth-connect-event';
import { Subjects } from '../../../../common/src/events/subjects';

export class AuthConnectedPublisher extends Publisher<AuthConnectedEvent> {
  subject: Subjects.AuthConnected = Subjects.AuthConnected;
}
