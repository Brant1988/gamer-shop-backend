import { NextFunction, Response } from "express";
import ProductInfoDescription from "../database/models/ProductInfoDescription.js";
import {
  ProductInfoRequest,
  ProductInfoDto,
} from "../types/ProductInfo.dto.js";

export const createProductInfoDescription = async (
  request: ProductInfoRequest<ProductInfoDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, productInfoTitleId } = request.body;
    const newProductInfoDescription = await ProductInfoDescription.create({
      name,
      productInfoTitleId,
    });
    return response.json(newProductInfoDescription);
  } catch (error) {
    next(error);
  }
};

export const deleteProductInfoDescription = async (
  request: ProductInfoRequest<ProductInfoDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.body;

    await ProductInfoDescription.destroy({
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
