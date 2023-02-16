import { Request } from "express";

export interface UserDto {
  email: string;
  password: string;
}

export interface UserRequest<T> extends Request {
  body: T;
}
