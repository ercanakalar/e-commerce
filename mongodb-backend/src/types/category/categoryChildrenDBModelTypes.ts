import mongoose from 'mongoose';

export interface CategoryChildrenAttrs {
  name: string;
  createdAt?: Date;
}

export interface CategoryChildrenModal extends mongoose.Model<CategoryChildrenDoc> {
  build(attrs: CategoryChildrenAttrs): CategoryChildrenDoc;
}

export interface CategoryChildrenDoc extends mongoose.Document {
  name: string;
  createdAt?: Date;
}
