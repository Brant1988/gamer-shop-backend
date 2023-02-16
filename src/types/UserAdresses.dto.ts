import { Request } from "express";

export interface UserAdressDto {
  city: string;
  country: string;
  postalCode: string;
  adress: string;
}

export interface UserAdressRequest<T> extends Request {
  body: T;
}
