export interface ITokens {
  access: string;
  refresh: string;
}

export interface IUserDetails {
  id: string;
  email: string;
  userType: string;
  permissions?: string;
  rememberToken?: string;
  status: 'active' | 'inactive';
  dob?: Date;
  createdAt: Date;
  emailVerified?: Date;
  updatedAt: Date;
}
