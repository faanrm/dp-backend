/* eslint-disable linebreak-style */
import "reflect-metadata";
import fp from "fastify-plugin";
import { createConnection, getConnectionOptions } from "typeorm";
import { Equipment } from "../modules/equipment/equipment.entity";
import { Product } from "../modules/products/products.entity";
import { orderProduct } from "../modules/orderProduct/orderProduct.entity";
import { ProductPlan } from "../modules/productPlan/productPlan.entity";
import { Material } from "../modules/material/material.entity";
import { Component } from "../modules/components/components.entity";
import { Operation } from "../modules/operation/operations.entity";
import { Maintenance } from "../modules/maintenance/maintenance.entity";
import { QualityControl } from "../modules/qualityControl/qualityControl.entity";
export default fp(async (server) => {
  try {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      options: { encrypt: true },
      synchronize: true,
      entities: [
        Product,
        Equipment,
        Material,
        orderProduct,
        Operation,
        Component,
        ProductPlan,
        Maintenance,
        QualityControl,
      ],
    });

    const connection = await createConnection(connectionOptions);
    console.log("database connected");

    server.decorate("db", {
      products: connection.getRepository(Product),
      equipments: connection.getRepository(Equipment),
      materials: connection.getRepository(Material),
      operations: connection.getRepository(Operation),
      components: connection.getRepository(Component),
      orderProducts: connection.getRepository(orderProduct),
      productPlans: connection.getRepository(ProductPlan),
      qualityControls: connection.getRepository(QualityControl),
      maintenances: connection.getRepository(Maintenance),
    });
  } catch (error) {
    console.log(error);
    console.log("make sure you have set .env variables - see .env.sample");
  }
});
