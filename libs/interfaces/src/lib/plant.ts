import { BaseModel } from './common/base-model';

export interface CommonDiseases {
  diseasesId: string;
  diseasesName: string;
}

export interface Plant extends BaseModel {
  image: string;
  id: string;
  plantName: string;
  scientificName: string;
  commonDiseases: CommonDiseases[];
  uses: string[];
}
