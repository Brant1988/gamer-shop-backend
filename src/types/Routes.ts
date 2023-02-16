export enum BrandRoutes {
  GET = "/brand",
  CREATE = "/brand/add",
  EDIT = "/brand/edit",
}

export enum CategoryRoutes {
  GET = "/category",
  CREATE = "/category/add",
  DELETE = "/category/delete",
}

export enum ProductInfoRoutes {
  GET = "/productinfo",
  TITLE_CREATE = "/productinfo/title/add",
  DESCRIPTION_CREATE = "/productinfo/description/add",
  TITLE_DELETE = "/productinfo/title/delete",
  DESCRIPTION_DELETE = "/productinfo/description/delete",
}

export enum ProductRoutes {
  GET = "/product",
  CREATE = "/product/add",
  DELETE = "/product/delete",
}

export enum ProductImages {
  CREATE = "/images/add",
  DELETE = "/images/delete",
}

export enum UserRoutes {
  REGISTER = "/register",
  LOGIN = "/login",
  AUTH = "/auth",
}

export enum UserPersonalRoutes {
  GET = "/user/personal",
  CREATE = "/user/personal/add",
  EDIT = "/user/personal/edit",
}

export enum UserAdressesRoutes {
  GET = "/user/adress",
  CREATE = "/user/adress/add",
  EDIT = "/user/adress/edit",
}

export enum OrdersRoutes {
  GET = "/orders",
  CREATE = "/orders/add",
  CREATE_AUTH = "/orders/create",
  PROCESS = "/orders/process",
}

export enum ShopRoutes {
  GET = "/shops",
  CREATE = "/shop/add",
  DELETE = "/shop/delete",
}
