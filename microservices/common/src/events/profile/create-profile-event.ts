import { Subjects } from '../subjects';

export interface ProfileCreateEvent {
  subject: Subjects.ProfileCreated;
  data: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    iat: number;
  };
}
