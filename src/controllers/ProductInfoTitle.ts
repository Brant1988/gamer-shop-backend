import { NextFunction, Request, Response } from "express";
import Categories from "../database/models/Categories.js";
import ProductInfoDescription from "../database/models/ProductInfoDescription.js";
import ProductInfoTitle from "../database/models/ProductInfoTitle.js";
import {
  ProductInfoRequest,
  ProductInfoDto,
} from "../types/ProductInfo.dto.js";

export const getProductInfos = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = request.query;
    const productInfos = await ProductInfoTitle.findAll({
      attributes: ["name", "id"],
      include: [
        {
          model: Categories,
          where: {
            id: categoryId,
          },
          attributes: ["name", "id"],
        },
        { model: ProductInfoDescription, attributes: ["name", "id"] },
      ],
    });
    return response.json(productInfos);
  } catch (error) {
    next(error);
  }
};

export const createProductInfoTitle = async (
  request: ProductInfoRequest<ProductInfoDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, categoryIds } = request.body;
    const newProductInfoTitle = await ProductInfoTitle.create({
      name,
    });

    if (categoryIds?.length)
      newProductInfoTitle.$add("categories", categoryIds);
    return response.json(newProductInfoTitle);
  } catch (error) {
    next(error);
  }
};

export const deleteProductInfoTitle = async (
  request: ProductInfoRequest<ProductInfoDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.body;

    await ProductInfoTitle.destroy({
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
