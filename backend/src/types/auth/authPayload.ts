export interface AuthPayload {
  id: string;
  email: string;
  expireToken: string;
  iat: number;
  role?: string;
}
