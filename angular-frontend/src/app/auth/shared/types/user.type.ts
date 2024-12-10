export type SignupUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SigninUser = {
  username: string;
  password: string;
  [key: string]: string;
};
