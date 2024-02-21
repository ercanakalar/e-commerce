import mongoose from 'mongoose';

interface SubCategory {
  name: string;
}

export interface ProductAttrs {
  category: string;
  subCategory: SubCategory[];
  name: string;
  price: number;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductModal extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

export interface ProductDoc extends mongoose.Document {
  category: string;
  subCategory: SubCategory[];
  name: string;
  price: number;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
