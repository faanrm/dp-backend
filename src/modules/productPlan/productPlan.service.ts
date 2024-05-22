import { DeepPartial } from "typeorm";
import { ProductPlan } from "./productPlan.entity";
import productPlanBuilder from "./productPlan.models";
import { Status } from "./productPlan.interface";
export default function productPlanServices(server) {
  const createProductPlan = async (
    productPlanData: DeepPartial<ProductPlan>
  ): Promise<ProductPlan> => {
    productPlanBuilder
      .setEnd_Time(productPlanData.startTime as Date)
      .setEnd_Time(productPlanData.endTime as Date)
      .setStatus(productPlanData.status as Status);

    const buildProductPlan = productPlanBuilder.build();
    const createdProductPlan = await server.db.productPlans.save(
      buildProductPlan
    );
    return createdProductPlan;
  };
  const getAllProductPlan = async (): Promise<ProductPlan[]> => {
    const productPlan = await server.db.productPlans.find();
    return productPlan;
  };
  const updateProductPlan = async (
    productPlanData: DeepPartial<ProductPlan>,
    id: string
  ): Promise<ProductPlan> => {
    const productPlan = await server.db.productPlans.find({
      where: { _id: id },
    });
    if (!productPlan) {
      throw new Error("No product plan found");
    }
    Object.assign(productPlan, productPlanData);
    await server.db.productPlans.save(productPlan);
    return productPlan;
  };
  const deleteProductPlan = async (id: string): Promise<void> => {
    const productPlan = await server.db.productPlans.delete(id);
    if (!productPlan) {
      throw new Error("Product not found");
    }
    return productPlan;
  };
  return {
    deleteProductPlan,
    updateProductPlan,
    getAllProductPlan,
    createProductPlan,
  };
}
