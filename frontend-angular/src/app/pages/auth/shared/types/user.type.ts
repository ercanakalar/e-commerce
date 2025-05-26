export interface ApiResponse<T> {
  data: T;
}

export type SignupUser = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SignUpResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type ForgotPassword = {
  email: string;
};
export type ForgotPasswordResponse = {
  resetTokenUrl: string;
};
