import { DeepPartial } from "typeorm";
import { Component } from "./components.entity";
export const componentsServices = (server) => {
  const createComponents = async (
    componentsData: DeepPartial<Component>
  ): Promise<Component> => {
    const createdComponents = new Component().clone();
    createdComponents.quantity = componentsData.quantity;

    if (componentsData.materialC) {
      const material = await server.db.materials.findOne(
        componentsData.materialC._id
      );
      if (material) {
        createdComponents.materialC = material;
      } else {
        throw new Error("Material not found");
      }
    }
    if (componentsData.productC) {
      const product = await server.db.products.findOne(
        componentsData.productC._id
      );
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
      const product = await server.db.products.findOne(
        componentsData.productC._id
      );
      if (product) {
        components.setProduct(product);
      } else {
        throw new Error("Product not found");
      }
    }

    if (componentsData.materialC) {
      const material = await server.db.materials.findOne(
        componentsData.materialC._id
      );
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
