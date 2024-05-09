/* eslint-disable linebreak-style */
import fastify from "fastify";
import db from "./config/db";
import productsHandler from "./modules/products/routes";
import equipmentHandler from "./modules/equipment/equipment.controller";
function createServer() {
  const server = fastify();
  server.register(require("fastify-cors"));

  server.register(require("fastify-oas"), {
    routePrefix: "/api",
    exposeRoute: true,
    swagger: {
      info: {
        title: "design pattern backend api",
        description: "api documentation",
        version: "0.1.0",
      },
      servers: [
        { url: "http://localhost:3000", description: "development" },
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
  server.register(productsHandler, { prefix: "/product" });
  server.register(equipmentHandler, { prefix: "/equipment" });

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString());
    res.send({ error });
  });

  return server;
}

export default createServer;
