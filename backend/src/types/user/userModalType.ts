import { Request, Response } from 'express';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserSignIn = {
  email: string;
  password: string;
};

export type UserSignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserResponse = {
  message: string;
  user: User;
  token: string;
};

export interface IArgs {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  message: string;
  user: User;
  token: string;
}
export interface IContext {
  req: Request;
  res: Response;
}

export interface ICurrentUserBasicInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  active: boolean;
}