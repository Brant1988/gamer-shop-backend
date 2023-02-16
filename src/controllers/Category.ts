import { NextFunction, Request, Response } from "express";
import Brands from "../database/models/Brands.js";
import Categories from "../database/models/Categories.js";
import ProductInfoDescription from "../database/models/ProductInfoDescription.js";
import ProductInfoTitle from "../database/models/ProductInfoTitle.js";
import { CategoryDto, CategoryRequest } from "../types/Category.dto.js";

export const getCategories = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.query;
    let categories;
    if (id) {
      categories = await Categories.findOne({
        where: {
          id,
        },
        attributes: ["id", "name"],
        include: [
          {
            model: ProductInfoTitle,
            attributes: ["id", "name"],
            include: [{ model: ProductInfoTitle, attributes: ["id", "name"] }],
          },
          { model: Brands, attributes: ["id", "name"] },
        ],
      });
    } else {
      categories = await Categories.findAll({
        attributes: ["id", "name"],
        include: [
          {
            model: ProductInfoTitle,
            include: [
              { model: ProductInfoDescription, attributes: ["id", "name"] },
            ],
            attributes: ["id", "name"],
          },
          { model: Brands, attributes: ["id", "name"] },
        ],
      });
    }

    return response.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  request: CategoryRequest<CategoryDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name } = request.body;
    const newCategory = await Categories.create({
      name,
    });
    return response.json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  request: CategoryRequest<CategoryDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.body;

    await Categories.destroy({
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
