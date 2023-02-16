import { Request } from "express";

export interface UserPersonalDto {
  phoneNumber: string;
  name: string;
  surname: string;
  userId: string;
}

export interface UserPersonalRequest<T> extends Request {
  body: T;
}
