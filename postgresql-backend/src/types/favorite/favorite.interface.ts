export interface IFavorite {
  productId: number;
}

export interface IFavoriteDatabase {
  id: number;
  auth_id: number;
  products: number[];
  updated_at: string;
}
