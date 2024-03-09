import mongoose from 'mongoose';
import { CategoryAttrs, CategoryDoc, CategoryModal } from '../../types/category';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    createdAt: {
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
  return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModal>(
  'category',
  categorySchema
);

export { Category };
