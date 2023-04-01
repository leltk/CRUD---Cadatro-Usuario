
export interface IDataUserRequest {
  name: string;
  age: number;
  password: string;
  email: string;
}

export interface IDataUserUpdateResponse{
  id: string,
  name: string,
  age: number,
  email: string
}

export interface IDataUserResponse {
  id: string;
  name: string;
  age: number;
  password?: string;
  email: string;
}

export interface IUpdateUserRequest {
  name?: string;
  age?: number;
  password?: string;
  email?: string;
}

export interface IBodyUser {
  id: string;
}