import mongoose from 'mongoose';

export interface AuthAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
  passwordResetToken?: string | undefined;
  passwordResetExpires?: Date | undefined;
  passwordChangedAt?: Date | undefined;
  expireToken: string;
}

export interface AuthModal extends mongoose.Model<AuthDoc> {
  build(attrs: AuthAttrs): AuthDoc;
}

export interface AuthDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
  passwordChangedAt: Date | number;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  expireToken: string;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
  createExpireToken(): string;
}
