export interface IAuthResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
  password_reset_token?: string;
  password_reset_expires?: string;
  expire_token?: string;
  active: boolean;
  created_at: Date;
  updated_at?: Date;
  password_changed_at?: Date;
}

export interface IAuthPayload {
  authId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface IDecodedToken {
  authId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
