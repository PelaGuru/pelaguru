import { Image } from './image';
import { BaseModel } from './common/base-model';

export interface Plant extends BaseModel {
  id: string;
  name: string;
  scientificName: string;
  popularDistrict: string;
  description: string;
  commonDiseases: string;
  images: Image[];
}
