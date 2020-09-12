import { BaseModel } from './common/base-model';
import { Image } from './image';

export interface Disease extends BaseModel {
  id: string;
  name: string;
  possibleCauses: string[];
  remedies: string[];
  description: string;
  images: Image[];
}
