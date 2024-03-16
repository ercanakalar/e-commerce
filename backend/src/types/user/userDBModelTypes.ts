import mongoose from 'mongoose';

export interface UserAttrs {
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

export interface UserModal extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export interface UserDoc extends mongoose.Document {
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
