import { BaseModel } from './common/base-model';
import { Image } from './image';

export interface Disease extends BaseModel {
  causes: string;
  diseaseName: string;
  id: string;
  image: string;
  additionalFeatures: string[];
  commonPlants: string[];
  commonSymptoms: string[];
  solutions: string[];
}
