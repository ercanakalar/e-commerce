export interface AuthPayload {
  id: number;
  email: string;
  expireToken: string;
  iat: number;
  role?: string;
}
