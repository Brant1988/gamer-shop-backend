import { NextFunction, Response } from "express";
import ProductImages from "../database/models/ProductImages.js";
import {
  ProductImageDto,
  ProductImageRequest,
} from "../types/ProductImage.dto..js";

export const createProductImage = async (
  request: ProductImageRequest<ProductImageDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { productId } = request.body;
    const newProductImage = await ProductImages.create({
      productId,
      name: request.file?.filename as string,
    });
    return response.json(newProductImage);
  } catch (error) {
    next(error);
  }
};

export const deleteProductImage = async (
  request: ProductImageRequest<ProductImageDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.body;

    await ProductImages.destroy({
      where: {
        id,
      },
      cascade: true,
    });

    return response.json({
      status: 200,
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
};
