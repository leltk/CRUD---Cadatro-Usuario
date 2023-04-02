
export interface IDataUserRequest {
  name: string;
  age: number;
  phone:string;
  password: string;
  email: string;
}

export interface IDataUserUpdateResponse{
  id: string,
  name: string,
  phone:string,
  age: number,
  email: string
}

export interface IDataUserResponse {
  id: string;
  name: string;
  age: number;
  phone:string;
  password?: string;
  email: string;
}

export interface IUpdateUserRequest {
  name?: string;
  age?: number;
  phone?: string;
  password?: string;
  email?: string;
}

export interface IBodyUser {
  id: string;
}