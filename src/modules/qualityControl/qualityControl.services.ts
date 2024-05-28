import { DeepPartial } from "typeorm";
import { QualityControl } from "./qualityControl.entity";

export const qualityControlServices = async (server) => {
  const controlProduct = async (
    productId: string,
    controlData: DeepPartial<QualityControl>
  ): Promise<QualityControl> => {
    const createdcontrol = new QualityControl().clone();
    createdcontrol.result = controlData.result;
    const product = await server.db.products.findOne(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    createdcontrol.product = product;
    return await server.db.qualityControls.save(createdcontrol);
  };
  return {
    controlProduct,
  };
};
