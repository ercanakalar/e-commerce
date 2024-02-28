import mongoose from 'mongoose';

export interface CategoryGroupAttrs {
  name: string;
  groupIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryGroupModal extends mongoose.Model<CategoryGroupDoc> {
  build(attrs: CategoryGroupAttrs): CategoryGroupDoc;
}

export interface CategoryGroupDoc extends mongoose.Document {
  name: string;
  groupIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
