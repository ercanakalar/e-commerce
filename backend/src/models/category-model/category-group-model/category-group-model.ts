import mongoose from 'mongoose';
import {
  CategoryGroupAttrs,
  CategoryGroupDoc,
  CategoryGroupModal,
} from '../../../types/category';

const categoryGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    categoryIds: {
      type: [String],
      required: true,
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

categoryGroupSchema.statics.build = (attrs: CategoryGroupAttrs) => {
  return new CategoryGroup(attrs);
};

const CategoryGroup = mongoose.model<CategoryGroupDoc, CategoryGroupModal>(
  'categoryGroup',
  categoryGroupSchema
);

export { CategoryGroup };
