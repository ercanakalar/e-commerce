import mongoose from 'mongoose';

export interface ProfileAttrs {
  authId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ProfileModal extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

export interface ProfileDoc extends mongoose.Document {
  authId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
