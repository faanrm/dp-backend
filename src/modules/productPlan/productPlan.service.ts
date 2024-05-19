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
      .setEstimate_Duration(productPlanData.duration as Date)
      .setStatus(productPlanData.status as Status);

    const buildProductPlan = productPlanBuilder.build();
    const createdProductPlan = await server.db.productPlans.save(
      buildProductPlan
    );
    return createdProductPlan;
  };

  return {
    createProductPlan,
  };
}
