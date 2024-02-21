import mongoose from 'mongoose';
import { ProductAttrs, ProductDoc, ProductModal } from '../../types/product';


const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
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
    photo: {
      type: String,
    },

    createdAt: {
      type: Date,
    },
    updatedAt: {
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
