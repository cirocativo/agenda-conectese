export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isAdm: boolean;
  createdAt: Date;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface IContactRequest {
  name: string;
  email: string;
  phone: string;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface IContactUpdate {
  name?: string;
  email?: string;
  phone?: string;
}
