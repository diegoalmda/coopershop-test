export interface IProductData {
  name: string,
  image_url: string,
  type: string,
  price: number,
  seller: string,
  available_sizes: string[],
  details: string,
  sport: string
};

export type Data = IProductData[];

export interface ICartItem {
  name: string,
  image_url: string,
  price: number,
  seller: string,
  selected_size?: string,
}

export interface ICartData extends ICartItem {
  quantity: number  
};