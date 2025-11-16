
export type ProductCategory = 'pure_oud' | 'perfume' | 'bakhoor' | 'powder' | 'gift_set' | 'accessory' | 'premium' | 'perfume_oil' | 'mist' | 'burner' | 'home_accessory';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  scentProfile: string[];
  category: ProductCategory;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'home' | 'product' | 'cart' | 'recommender' | 'category' 
  | 'oud_world' | 'account' | 'custom_gifts' | 'limited_editions' 
  | 'origins' | 'usage_tips' | 'blog' | 'login' | 'order_history' | 'wishlist'
  | 'about' | 'faq' | 'shipping' | 'privacy' | 'terms' | 'contact';
