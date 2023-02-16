import { NextFunction, Request, Response } from "express";
import Brands from "../database/models/Brands.js";
import Categories from "../database/models/Categories.js";
import { BrandDto, BrandRequest } from "../types/Brand.dto.js";

export const getBrands = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = request.query;
    let brands;
    if (categoryId) {
      brands = await Brands.findAll({
        attributes: ["id", "name"],
        include: [
          {
            model: Categories,
            where: {
              id: categoryId,
            },
          },
        ],
      });
    } else {
      brands = await Brands.findAll({
        attributes: ["id", "name"],
        include: [{ model: Categories, attributes: ["id", "name"] }],
      });
    }
    return response.json(brands);
  } catch (error) {
    next(error);
  }
};

export const createBrand = async (
  request: BrandRequest<BrandDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, categoryIds } = request.body;

    const newBrand = await Brands.create({
      name,
    });

    if (categoryIds?.length) await newBrand.$add("categories", categoryIds);

    return response.json(newBrand);
  } catch (error) {
    next(error);
  }
};

export const editBrand = async (
  request: BrandRequest<BrandDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id, categoryIds } = request.body;

    const brand = await Brands.findOne({
      where: {
        id,
      },
    });

    if (categoryIds?.length && brand)
      await brand.$add("categories", categoryIds);

    return response.json(brand);
  } catch (error) {
    next(error);
  }
};
