export interface IProductPlan {
  estimate_duration: Date;
  startTime: Date;
  endTime: Date;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export enum Status {
  in_progress,
  finish,
}
