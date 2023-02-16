import { Request } from "express";

export interface ProductInfoDto {
  id: string;
  categoryIds: string;
  productInfoTitleId: string;
  name: string;
}

export interface ProductInfoRequest<T> extends Request {
  body: T;
}
