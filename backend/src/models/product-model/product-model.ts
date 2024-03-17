import mongoose from 'mongoose';
import { ProductAttrs, ProductDoc, ProductModal } from '../../types/product';

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subCategory',
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
      required: true,
    },
    children: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'children',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
      default: 'Yes',
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['processing', 'done', 'rejected', 'canceled'],
      default: 'processing',
    },
    createdAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModal>(
  'product',
  productSchema
);

export { Product };
