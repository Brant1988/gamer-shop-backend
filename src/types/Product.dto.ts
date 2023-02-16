import { Request } from "express";

export interface ProductDto {
  name: string;
  isOnSale: boolean;
  price: string;
  oldPrice?: string;
  categoryId: string;
  brandId: string;
  subCategoryId?: string;
  prodInfoDescriptionsId: string;
  description: string;
}

export interface ProductRequest<T> extends Request {
  body: T;
}
