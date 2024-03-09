import mongoose from 'mongoose';
import {
  SubCategoryAttrs,
  SubCategoryDoc,
  SubCategoryModal,
} from '../../../types/category';

const subCategorySchema = new mongoose.Schema(
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

subCategorySchema.statics.build = (attrs: SubCategoryAttrs) => {
  return new SubCategory(attrs);
};

const SubCategory = mongoose.model<SubCategoryDoc, SubCategoryModal>(
  'subCategory',
  subCategorySchema
);

export { SubCategory };
