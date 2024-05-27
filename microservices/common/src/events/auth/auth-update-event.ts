import { Subjects } from '../subjects';

export interface AuthUpdatedEvent {
  subject: Subjects.AuthUpdated;
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}
