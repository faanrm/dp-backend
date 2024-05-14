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
export default fp(async (server) => {
  try {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      options: { encrypt: true },
      entities: [
        Product,
        Equipment,
        orderProduct,
        ProductPlan,
        Material,
        Component,
      ],
    });

    const connection = await createConnection(connectionOptions);
    console.log("database connected");

    server.decorate("db", {
      products: connection.getRepository(Product),
      equipments: connection.getRepository(Equipment),
      orderProducts: connection.getRepository(orderProduct),
      productPlans: connection.getRepository(ProductPlan),
    });
  } catch (error) {
    console.log(error);
    console.log("make sure you have set .env variables - see .env.sample");
  }
});
