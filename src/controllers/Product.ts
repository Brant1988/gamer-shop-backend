import { NextFunction, Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import Brands from "../database/models/Brands.js";
import ProductImages from "../database/models/ProductImages.js";
import ProductInfoDescription from "../database/models/ProductInfoDescription.js";
import Products from "../database/models/Products.js";
import { ProductDto, ProductRequest } from "../types/Product.dto.js";

export const getProducts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      id,
      page = 1,
      name,
      limit = 6,
      descriptionIds,
      categoryId,
      brandId,
      isOnSale,
    } = request.query;

    let products;
    if (name) {
      products = await Products.findAll({
        limit: Number(limit),
        offset: Number(limit) * (Number(page) - 1),
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: [
          { model: Brands, attributes: ["id", "name"] },
          { model: ProductInfoDescription, attributes: ["id", "name"] },
          { model: ProductImages, attributes: ["name"] },
        ],
      });
    } else if (id) {
      products = await Products.findAndCountAll({
        limit: Number(limit),
        offset: Number(limit) * (Number(page) - 1),
        where: {
          id,
        },
        include: [
          { model: Brands, attributes: ["id", "name"] },
          { model: ProductInfoDescription, attributes: ["id", "name"] },
          { model: ProductImages, attributes: ["name"] },
        ],
      });
    } else if (categoryId && brandId?.length && !descriptionIds?.length) {
      products = await Products.findAndCountAll({
        limit: Number(limit),
        offset: Number(limit) * (Number(page) - 1),
        where: {
          categoryId,
          brandId,
        },
        distinct: true,
        include: [
          { model: Brands, attributes: ["id", "name"] },
          {
            model: ProductInfoDescription,
            attributes: ["id", "name"],
          },
          { model: ProductImages, attributes: ["name"] },
        ],
      });
    } else if (categoryId && descriptionIds?.length && !brandId?.length) {
      products = await Products.findAndCountAll({
        limit: Number(limit),
        offset: Number(limit) * (Number(page) - 1),
        where: {
          categoryId,
        },
        distinct: true,
        include: [
          { model: Brands, attributes: ["id", "name"] },
          {
            model: ProductInfoDescription,
            where: {
              id: descriptionIds,
            },
            attributes: ["id", "name"],
          },
          { model: ProductImages, attributes: ["name"] },
        ],
      });
    } else if (isOnSale) {
      products = await Products.findAll({
        limit: 1,
        where: {
          isOnSale,
        },
        order: [Sequelize.fn("RANDOM")],
        include: [
          { model: Brands, attributes: ["id", "name"] },
          { model: ProductImages, attributes: ["name"] },
        ],
      });
    } else if (categoryId && brandId?.length && descriptionIds?.length) {
      products = await Products.findAndCountAll({
        limit: Number(limit),
        offset: Number(limit) * (Number(page) - 1),
        where: {
          categoryId,
          brandId,
        },
        distinct: true,
        include: [
          { model: Brands, attributes: ["id", "name"] },
          {
            model: ProductInfoDescription,
            where: {
              id: descriptionIds,
            },
            attributes: ["id", "name"],
          },
          { model: ProductImages, attributes: ["name"] },
        ],
      });
    } else if (categoryId) {
      products = await Products.findAndCountAll({
        limit: Number(limit),
        offset: Number(limit) * (Number(page) - 1),
        where: {
          categoryId,
        },
        distinct: true,
        include: [
          { model: Brands, attributes: ["id", "name"] },
          {
            model: ProductInfoDescription,
            attributes: ["id", "name"],
          },
          { model: ProductImages, attributes: ["name"] },
        ],
      });
    } else {
      products = await Products.findAndCountAll({
        limit: Number(limit),
        offset: Number(limit) * (Number(page) - 1),
        distinct: true,
        include: [
          { model: Brands, attributes: ["id", "name"] },
          {
            model: ProductInfoDescription,
            attributes: ["id", "name"],
          },
          { model: ProductImages, attributes: ["name"] },
        ],
      });
    }

    return response.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  request: ProductRequest<ProductDto>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      isOnSale,
      brandId,
      price,
      oldPrice,
      categoryId,
      prodInfoDescriptionsId,
      description,
    } = request.body;
    const parsedPrice = parseInt(price);

    let newProduct;
    if (isOnSale) {
      const parsedOldPrice = parseInt(oldPrice as string);
      newProduct = await Products.create({
        name,
        isOnSale,
        brandId,
        categoryId,
        prodInfoDescriptionsId,
        description,
        price: parsedPrice,
        oldPrice: parsedOldPrice,
      });
    } else {
      newProduct = await Products.create({
        name,
        brandId,
        categoryId,
        description,
        prodInfoDescriptionsId,
        price: parsedPrice,
      });
    }

    if (prodInfoDescriptionsId?.length)
      newProduct.$add("productDescriptions", prodInfoDescriptionsId);

    return response.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.body;

    const product = await Products.destroy({
      where: {
        id,
      },
      cascade: true,
    });

    return response.json(product);
  } catch (error) {
    next(error);
  }
};
