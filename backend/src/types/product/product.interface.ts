export interface IProduct {
  userId: string;
  category: string;
  subCategory: string;
  group: string;
  children: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  stock: number;
  sold: number;
  images: [string];
  shipping: string;
  brand: string;
}

export interface IProductGetId {
  id: string;
}
