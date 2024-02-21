import mongoose from 'mongoose';

export interface ProfileAttrs {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
}

export interface ProfileModal extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

export interface ProfileDoc extends mongoose.Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}
