export interface UserPayload {
  id: string;
  email: string;
  expireToken: string;
  iat: number;
  role?: string;
}
