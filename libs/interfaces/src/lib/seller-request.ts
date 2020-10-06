import { BaseModel } from './common/base-model';
import { SellerRequestStatus } from './seller-request-status';

export interface SellerRequest extends BaseModel {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  contactNumber: string;
  documentUrl: string;
  documentType: string;
  shopName: string;
  description: string;
  status: SellerRequestStatus;
}
