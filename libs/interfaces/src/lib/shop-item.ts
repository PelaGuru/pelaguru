import { BaseModel } from './common/base-model';

export interface ShopItem extends BaseModel {
  id: string;
  name: string;
  price: string;
  description: string;
  diseases: string[];
  image: string;
  ingredients: string;
  note: string;
  shopId: string;
}
