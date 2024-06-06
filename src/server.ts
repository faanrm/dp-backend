/* eslint-disable linebreak-style */
import fastify from "fastify";
import db from "./config/db";
import equipmentHandler from "./modules/equipment/equipment.controller";
import materialHandler from "./modules/material/material.controller";
import componentsHandler from "./modules/components/components.controller";
import operationHandler from "./modules/operation/operations.controller";
import productHandler from "./modules/products/product.controller";
import orderProduchHandler from "./modules/orderProduct/orderProduct.controller";
import productPlanHandler from "./modules/productPlan/productPlan.controller";
function createServer() {
  const server = fastify();
  server.register(require("fastify-cors"));

  server.register(require("fastify-oas"), {
    routePrefix: "/api",
    exposeRoute: true,
    logging: true,
    pluginTimeout: 20000,
    swagger: {
      info: {
        title: "design pattern backend api",
        description: "api documentation",
        version: "0.1.0",
      },
      servers: [
        { url: "http://localhost:5200", description: "development" },
        {
          url: "https://<production-url>",
          description: "production",
        },
      ],
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  server.register(db);
  server.register(productHandler, { prefix: "/product" });
  server.register(equipmentHandler, { prefix: "/equipment" });
  server.register(materialHandler, { prefix: "/material" });
  server.register(componentsHandler, { prefix: "/components" });
  server.register(operationHandler, { prefix: "/operations" });
  server.register(orderProduchHandler, { prefix: "/order" });
  server.register(productPlanHandler, { prefix: "/productPlan" });
  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString());
    res.send({ error });
  });

  return server;
}

export default createServer;
