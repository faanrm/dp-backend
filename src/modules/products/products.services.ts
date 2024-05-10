import { IProduct } from "./products.interface";
import { DeepPartial } from "typeorm";
import { Product } from "./products.entity";
import products from "./products.models";
export const productsService = (server) => {
  const createProduct = async (
    productData: DeepPartial<IProduct>
  ): Promise<IProduct> => {
    products
      .setQuantity(productData.quantity)
      .setDescription(productData.description)
      .setPrice(productData.price);
    const builtProduct = products.build();
    const createdProduct = new Product();
    Object.assign(createdProduct, builtProduct);

    return createdProduct;
  };
  return { createProduct };
};
