import mongoose from 'mongoose';

export interface ProductAttrs {
  userId: string;
  category: string;
  subCategory: string;
  group: string;
  children: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  rating: number;
  stock: number;
  sold: number;
  images: string[];
  shipping: string;
  brand: string;
  status: string;
  createdAt: Date;
  updateAt: Date;
}

export interface ProductModal extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

export interface ProductDoc extends mongoose.Document {
  userId: string;
  category: string;
  subCategory: string;
  group: string;
  children: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  rating: number;
  stock: number;
  sold: number;
  images: string[];
  shipping: string;
  brand: string;
  status: string;
  createdAt: Date;
  updateAt: Date;
}
