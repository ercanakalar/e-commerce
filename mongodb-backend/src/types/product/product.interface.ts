export interface IProduct {
  authId: string;
  category: string;
  subCategory: string;
  group: string;
  children: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: [string];
  shipping: string;
  brand: string;
}

export interface IProductGetId {
  id: string;
}

export interface IProductUpdate {
  id: string;
  price: number;
  discount: number;
  description: string;
  stock: number;
  images: [string];
  shipping: string;
}

export interface IProductDeleteId {
  id: string;
}