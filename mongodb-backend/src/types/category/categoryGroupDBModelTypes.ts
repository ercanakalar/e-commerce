import mongoose from 'mongoose';

export interface CategoryGroupAttrs {
  name: string;
  createdAt?: Date;
}

export interface CategoryGroupModal extends mongoose.Model<CategoryGroupDoc> {
  build(attrs: CategoryGroupAttrs): CategoryGroupDoc;
}

export interface CategoryGroupDoc extends mongoose.Document {
  name: string;
  createdAt?: Date;
}
