import { IProductPlan } from "./productPlan.interface";

class ProductPlanBuilder {
  private estimate_duration: Date;
  private real_date: Date;
  private status: string;

  constructor() {}

  setEstimate_Duration(estimate_duration: Date): ProductPlanBuilder {
    this.estimate_duration = estimate_duration;
    return this;
  }

  setReal_Date(real_date: Date): ProductPlanBuilder {
    this.real_date = real_date;
    return this;
  }
  setStatus(status: string): ProductPlanBuilder {
    this.status = status;
    return this;
  }

  build(): IProductPlan {
    return {
      estimate_duration: this.estimate_duration,
      real_date: this.real_date,
      status: this.status,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

const productPlan = new ProductPlanBuilder();
export default productPlan;
