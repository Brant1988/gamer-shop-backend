import { Request } from "express";

export interface BrandDto {
  id: string;
  categoryIds: string;
  name: string;
}

export interface BrandRequest<T> extends Request {
  body: T;
}
