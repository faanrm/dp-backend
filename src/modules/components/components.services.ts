import { DeepPartial, In } from "typeorm";
import { Component } from "./components.entity";
export const componentsServices = (server) => {
  const createComponents = async (
    componentsData: DeepPartial<Component>
  ): Promise<Component> => {
    const createdComponents = new Component().clone();
    createdComponents.quantity = componentsData.quantity;

    if (componentsData.materialC) {
      const materialIds = componentsData.materialC.map((mt) => mt._id);
      const material = await server.db.materials.findOne({
        where: { _id: In(materialIds) },
      });
      if (material) {
        createdComponents.materialC = material;
      } else {
        throw new Error("Material not found");
      }
    }
    if (componentsData.productC) {
      const productIds = componentsData.productC.map((prd) => prd._id);
      const product = await server.db.products.findOne({
        where: { _id: In(productIds) },
      });
      if (product) {
        componentsData.productC = product;
      } else {
        throw new Error("Product not found");
      }
    }
    return await server.db.components.save(createdComponents);
  };
  const updateComponents = async (
    id: string,
    componentsData: DeepPartial<Component>
  ): Promise<Component> => {
    const components = await server.db.components.findOne({ _id: id });
    if (!components) {
      throw new Error("Components not found");
    }
    Object.assign(components, componentsData);
    if (componentsData.productC) {
      const productIds = componentsData.productC.map((cp) => cp._id);
      const product = await server.db.products.findOne({
        where: { _id: In(productIds) },
      });
      if (product) {
        components.setProduct(product);
      } else {
        throw new Error("Product not found");
      }
    }

    if (componentsData.materialC) {
      const materialIds = componentsData.materialC.map((mt) => mt._id);
      const material = await server.db.components.find({
        where: { _id: In(materialIds) },
      });
      if (material) {
        components.setMaterial(material);
      } else {
        throw new Error("Material not found");
      }
    }
    return await server.db.components.save(components);
  };
  const deleteComponents = async (id: string): Promise<void> => {
    const components = await server.db.components.delete(id);
    if (!components) {
      throw new Error("Components not found");
    }
    return components;
  };
  const getAllComponents = async (): Promise<Component[]> => {
    return await server.db.components.find();
  };
  return {
    deleteComponents,
    createComponents,
    updateComponents,
    getAllComponents,
  };
};
