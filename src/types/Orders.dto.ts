import { Request } from "express";
import Products from "../database/models/Products.js";

export interface OrdersDto {
  email: string;
  phone: string;
  city: string;
  country: string;
  postalCode: string;
  adress: string;
  delivery: boolean;
  status: string;
  userName?: string;
  userSurname?: string;
  summary: string;
  userId?: string;
  products: Array<Products>;
}

export interface OrdersRequest<T> extends Request {
  body: T;
}
