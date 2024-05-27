export interface AuthPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  expireToken: string;
  iat: number;
  role: string;
  exp?: number;
}
