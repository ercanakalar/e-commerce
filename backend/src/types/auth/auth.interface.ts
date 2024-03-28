export interface Auth {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  passwordChangedAt: string;
  passwordResetToken: string;
  passwordResetExpires: string;
  expireToken: string;
  active: boolean;
}
export interface AuthCurrent {
  id: number;
  email: string;
  password: string;
  role: string;
  expire_token: string;
  password_change_at: Date;
}
export interface AuthSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthSignUpResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  expireToken: string;
}
