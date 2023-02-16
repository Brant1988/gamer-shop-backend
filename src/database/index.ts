import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import BrandCategory from "./models/BrandCategory.js";
import Brands from "./models/Brands.js";
import Categories from "./models/Categories.js";
import OrderedProducts from "./models/OrderedProducts.js";
import Orders from "./models/Orders.js";
import ProductInfoDescription from "./models/ProductInfoDescription.js";
import ProductInfoTitle from "./models/ProductInfoTitle.js";
import Products from "./models/Products.js";
import User from "./models/User.js";
import UserAdresses from "./models/UserAdresses.js";
import UserPeronal from "./models/UserPersonalInfo.js";
import ProductImages from "./models/ProductImages.js";
import DescriptionsProducts from "./models/DescriptionProducts.js";
import TitlesCategories from "./models/TitlesCategories.js";
import AmountOrderedProducts from "./models/AmountOrderedProducts.js";
import Shops from "./models/Shops.js";

dotenv.config();

export const sequelize = new Sequelize({
  database: "qdsntehy",
  dialect: "postgres",
  username: "qdsntehy",
  password: "MU_zJ8ghpdR6AUWcI9aTpH6PHww7SfRj",
  storage: ":memory:",
  host: "dumbo.db.elephantsql.com",
  port: 5432,
  models: [
    Categories,
    Brands,
    BrandCategory,
    Products,
    ProductInfoTitle,
    ProductInfoDescription,
    ProductImages,
    DescriptionsProducts,
    Orders,
    OrderedProducts,
    TitlesCategories,
    User,
    UserPeronal,
    UserAdresses,
    AmountOrderedProducts,
    Shops,
  ],
});
