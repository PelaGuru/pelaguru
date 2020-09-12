import { BaseModel } from './common/base-model';

export interface ShopItem extends BaseModel {
  id: string;
  name: string;
  price: string;
  disabled: boolean;
  approved: boolean;
}
