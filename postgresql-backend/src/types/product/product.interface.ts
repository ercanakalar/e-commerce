export interface IProduct {
  authId: number;
  category: number;
  subCategory: number;
  group: number;
  children: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: [string];
  shipping: boolean;
  brand: string;
}

export interface IProductGetId {
  id: number;
}

export interface IProductUpdate {
  id: number;
  price: number;
  discount: number;
  description: string;
  stock: number;
  images: [string];
  shipping: boolean;
}

export interface IProductDeleteId {
  id: number;
}