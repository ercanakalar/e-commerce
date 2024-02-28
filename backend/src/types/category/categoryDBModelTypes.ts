import mongoose from 'mongoose';

interface SubCategory {
  name: string;
}

export interface CategoryAttrs {
  category: string;
  subCategory: SubCategory[];
  name: string;
  price: number;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryModal extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

export interface CategoryDoc extends mongoose.Document {
  category: string;
  subCategory: SubCategory[];
  name: string;
  price: number;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
