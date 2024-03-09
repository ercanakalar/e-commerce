import mongoose from 'mongoose';

export interface ProductAttrs {
  category: string;
  subCategory: string;
  group: string;
  children: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  stock: number;
  sold: number;
  images: string[];
  shipping: string;
  brand: string;
  createdAt: Date;
  updateAt: Date;
}

export interface ProductModal extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

export interface ProductDoc extends mongoose.Document {
  category: string;
  subCategory: string;
  group: string;
  children: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  stock: number;
  sold: number;
  images: string[];
  shipping: string;
  brand: string;
  createdAt: Date;
  updateAt: Date;
}
