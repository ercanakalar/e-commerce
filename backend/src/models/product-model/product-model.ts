import mongoose from 'mongoose';
import { ProductAttrs, ProductDoc, ProductModal } from '../../types/product';

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subCategory',
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
    },
    children: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'children',
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
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    rating: {
      type: Number,
      required: true,
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
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    }
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
