import mongoose from 'mongoose';

export interface ProductAttrs {

}

export interface ProductModal extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

export interface ProductDoc extends mongoose.Document {

}
