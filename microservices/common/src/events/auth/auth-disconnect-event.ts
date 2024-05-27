import { Subjects } from '../subjects';

export interface AuthDisconnectedEvent {
  subject: Subjects.AuthDisconnected;
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}
