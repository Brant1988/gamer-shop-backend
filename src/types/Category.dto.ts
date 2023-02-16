import { Request } from "express";

export interface CategoryDto {
  id: string;
  name: string;
}

export interface CategoryRequest<T> extends Request {
  body: T;
}
