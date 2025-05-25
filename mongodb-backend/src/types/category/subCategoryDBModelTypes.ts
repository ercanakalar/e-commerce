import mongoose from 'mongoose';

export interface SubCategoryAttrs {
  name: string;
  createdAt?: Date;
}

export interface SubCategoryModal extends mongoose.Model<SubCategoryDoc> {
  build(attrs: SubCategoryAttrs): SubCategoryDoc;
}

export interface SubCategoryDoc extends mongoose.Document {
  name: string;
  createdAt?: Date;
}
