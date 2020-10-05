import { BaseModel } from './common/base-model';
import { Image } from './image';

export interface Chemical extends BaseModel {
  id: string;
  name: string;
  description: string;
  images: Image[];
}
