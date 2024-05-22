import { Status, IProductPlan } from "./productPlan.interface";

class ProductPlanBuilder {
  private startTime: Date;
  private endTime: Date;
  private status: Status;

  constructor() {}

  setStart_Time(startTime: Date): ProductPlanBuilder {
    this.startTime = startTime;
    return this;
  }
  setEnd_Time(endTime: Date): ProductPlanBuilder {
    this.endTime = endTime;
    return this;
  }

  setStatus(status: Status): ProductPlanBuilder {
    this.status = status;
    return this;
  }

  build(): IProductPlan {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

const productPlanBuilder = new ProductPlanBuilder();
export default productPlanBuilder;
