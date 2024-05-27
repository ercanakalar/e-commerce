import { Subjects } from '../subjects';

export interface AuthConnectedEvent {
  subject: Subjects.AuthConnected;
  data: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    iat: number;
  };
}
