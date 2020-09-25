import { BaseModel } from './common/base-model';

export interface Chemical extends BaseModel {
  id: string;
  name: string;
  description: string;
}
