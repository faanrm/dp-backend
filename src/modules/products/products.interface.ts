import { Material } from "../material/material.entity";
export interface IProduct {
  _id?: number;
  quantity: number;
  name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface IProductWithMaterials extends IProduct {
  materials: Material[];
}
