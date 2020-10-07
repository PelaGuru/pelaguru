import { BaseModel } from './common/base-model';

export interface Shop extends BaseModel {
  id: string;
  name: string;
  vendorId: string;
  description: string;
  approved: boolean;
  closed: boolean;
  image: string;
  address: string;
  contactNumber: string;
  email: string;
}
