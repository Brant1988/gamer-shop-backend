import { Request } from "express";

export interface ProductImageDto {
  id: string;
  productId: string;
  name: string;
}

export interface ProductImageRequest<T> extends Request {
  body: T;
}
