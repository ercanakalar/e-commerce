import mongoose from 'mongoose';
import { CategoryAttrs, CategoryDoc, CategoryModal } from '../../types/category';

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: [subCategorySchema],
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



categorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new category(attrs);
};

const category = mongoose.model<CategoryDoc, CategoryModal>(
  'category',
  categorySchema
);

export { category };
