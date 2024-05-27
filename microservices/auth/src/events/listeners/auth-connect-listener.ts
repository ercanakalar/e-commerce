import { Listener } from '../../../../common/src/events/base-listener';
import { AuthConnectedEvent } from '../../../../common/src/events/auth/auth-connect-event';

export class AuthConnectedListener extends Listener<AuthConnectedEvent> {
  onMessage(data: AuthConnectedEvent['data'], msg: { ack: () => void }) {
    const { id, email, firstName, lastName, role } = data;
    
    msg.ack();
  }
}
