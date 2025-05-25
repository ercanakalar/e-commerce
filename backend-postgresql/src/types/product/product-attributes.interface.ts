export interface IProductAttributes {
  productId: number;
  attributeKey: string;
  attributeValue: string;
}

export interface IDeleteProductAttributeById {
  attributeId: number;
}

export interface IUpdateProductAttribute {
  attributeId: number;
  attributeKey: string;
  attributeValue: string;
}

export interface IProductAttributesDatabase {
  id: number;
  product_id: number;
  attribute_key: string;
  attribute_value: string;
  created_at: Date;
  updated_at: Date;
}
