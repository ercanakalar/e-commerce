import mongoose from 'mongoose';
import {
  CategoryChildrenAttrs,
  CategoryChildrenDoc,
  CategoryChildrenModal,
} from '../../../types/category';

const categoryChildrenSchema = new mongoose.Schema(
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

categoryChildrenSchema.statics.build = (attrs: CategoryChildrenAttrs) => {
  return new CategoryChildren(attrs);
};

const CategoryChildren = mongoose.model<CategoryChildrenDoc, CategoryChildrenModal>(
  'categoryChildren',
  categoryChildrenSchema
);

export { CategoryChildren };
