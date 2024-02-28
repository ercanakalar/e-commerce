import mongoose from 'mongoose';

export interface CategoryAttrs {
  name: string;
  groupIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryModal extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

export interface CategoryDoc extends mongoose.Document {
  name: string;
  groupIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
