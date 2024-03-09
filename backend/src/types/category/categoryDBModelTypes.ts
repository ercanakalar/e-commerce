import mongoose from 'mongoose';

export interface CategoryAttrs {
  name: string;
  createdAt?: Date;
}

export interface CategoryModal extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

export interface CategoryDoc extends mongoose.Document {
  name: string;
  createdAt?: Date;
}
