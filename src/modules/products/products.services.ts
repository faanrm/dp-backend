import { IProduct, IProductWithMaterials } from "./products.interface";
import { DeepPartial } from "typeorm";
import productBuilder from "./products.models";
export const productsService = (server) => {
  const createProduct = async (
    productData: DeepPartial<IProduct>
  ): Promise<IProduct> => {
    productBuilder
      .setName(productData.name)
      .setQuantity(productData.quantity)
      .setDescription(productData.description)
      .setPrice(productData.price);

    const builtProduct = productBuilder.build();
    const createdProduct = await server.db.products.save(builtProduct);
    return createdProduct;
  };
  const getAllProducts = async (): Promise<IProduct[]> => {
    return server.db.products.find();
  };

  const getProductById = async (id: number): Promise<IProduct | null> => {
    return server.db.products.findOne(id);
  };

  const updateProduct = async (
    id: number,
    productData: DeepPartial<IProduct>
  ): Promise<IProduct | null> => {
    const product = await server.db.products.findOne(id);
    if (!product) return null;

    Object.assign(product, productData);
    return product.save();
  };

  const deleteProduct = async (id: number): Promise<void> => {
    const product = await server.db.products.delete(id);
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
