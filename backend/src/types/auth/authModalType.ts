import { Request, Response } from 'express';

export type Auth = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthSignIn = {
  email: string;
  password: string;
};

export type AuthSignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthResponse = {
  message: string;
  auth: Auth;
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
  auth: Auth;
  token: string;
}
export interface IContext {
  req: Request;
  res: Response;
}

export interface ICurrentAuthBasicInfo {
  id: number;
  address: number;
  phone: string;
  photo: string;
}

export enum AuthRole {
  ADMIN = 'admin',
  USER = 'user',
  SELLER = 'seller',
}
