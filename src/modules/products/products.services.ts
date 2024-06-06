import { IProduct, IProductWithMaterials } from "./products.interface";
import { DeepPartial } from "typeorm";
import { ProductBuilder } from "./products.models";
import { Product } from "./products.entity";
export const productsService = (server) => {
  const createProduct = async (
    productData: DeepPartial<IProduct>
  ): Promise<IProduct> => {
    const productBuilder = new ProductBuilder()
      .setName(productData.name)
      .setQuantity(productData.quantity)
      .setDescription(productData.description)
      .setPrice(productData.price);
    const builtProduct = productBuilder.build();
    const createdProduct = await server.db.products.save(builtProduct);
    return createdProduct;
  };
  const getAllProducts = async (): Promise<Product[]> => {
    const product = await server.db.products.find();
    return product;
  };

  const getProductById = async (id: string): Promise<IProduct | null> => {
    return server.db.products.findOne(id);
  };
  const updateProduct = async (
    id: string,
    productData: DeepPartial<IProduct>
  ): Promise<IProduct | null> => {
    const product = await server.db.products.findOne({ _id: id });
    if (!product) return null;

    Object.assign(product, productData);
    await product.save();

    return product;
  };

  const deleteProduct = async (id: string): Promise<void> => {
    const product = await server.db.products.delete({ _id: id });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  };
  const getMaterialsByProduct = async (
    id: string
  ): Promise<IProductWithMaterials | null> => {
    const product = await server.db.products.findOne(id, {
      relations: ["materials"],
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  };
  return {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    getMaterialsByProduct,
  };
};
