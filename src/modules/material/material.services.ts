import { IMaterial } from "./material.interface";
import { DeepPartial } from "typeorm";
import { Material } from "./material.entity";
export const materialServices = (server) => {
  const addMaterial = async (
    materialData: DeepPartial<IMaterial>
  ): Promise<IMaterial> => {
    const createdMaterial = new Material().clone();
    createdMaterial.name = materialData.name;
    createdMaterial.inventoryLevel = materialData.inventoryLevel;
    createdMaterial.description = materialData.description;
    return await server.db.materials.save(createdMaterial);
  };

  const getAllMaterial = async (): Promise<IMaterial[]> => {
    const materials = await server.db.materials.find();
    return materials;
  };
  const updateMaterial = async (
    id: string,
    materialData: DeepPartial<IMaterial>
  ): Promise<IMaterial> => {
    const material = await server.db.materials.findOne({ _id: id });
    if (!material) {
      throw new Error("Material not found");
    }
    Object.assign(material, materialData);
    return await server.db.materials.save();
  };
  const deleteMaterial = async (id: string): Promise<void> => {
    const material = await server.db.materials.delete(id);
    if (!material) {
      throw new Error("Material not found");
    }
    return material;
  };
  return {
    addMaterial,
    getAllMaterial,
    updateMaterial,
    deleteMaterial,
  };
};
