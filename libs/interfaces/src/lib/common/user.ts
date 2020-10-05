import { BaseModel } from './base-model';
import { UserRole } from './user-roles';

export interface User extends BaseModel {
  userId: string;
  displayName: string;
  email: string;
  role?: UserRole;
  profilePictureUrl?: string;
  disabled: boolean;
}
