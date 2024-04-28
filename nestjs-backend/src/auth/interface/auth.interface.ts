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
  created_at: string;
  updated_at?: string;
  password_changed_at?: string;
}
