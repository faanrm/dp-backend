import { orderProduct } from "./orderProduct.entity";
import { IOrderProduct } from "./orderProduct.interface";
import { DeepPartial, In } from "typeorm";
import { Status } from "./orderProduct.interface";
export const orderProductServices = (server) => {
  const createOrderProduct = async (
    orderProductData: DeepPartial<orderProduct>
  ): Promise<orderProduct> => {
    const createdOrderProduct = new orderProduct().clone();
    createdOrderProduct.order_number = orderProductData.order_number;
    createdOrderProduct.order_quantity = orderProductData.order_quantity;
    createdOrderProduct.order_date = orderProductData.order_date as Date;
    createdOrderProduct.delivery_date = orderProductData.delivery_date as Date;
    createdOrderProduct.status = orderProductData.status;
    if (orderProductData.productO) {
      const productIds = orderProductData.productO.map((prd) => prd._id);
      const product = await server.db.products.findOne({
        where: { _id: In(productIds) },
      });
      if (product) {
        createdOrderProduct.productO = product;
      }
    }
    return await server.db.orderProducts.save(createdOrderProduct);
  };
  const getAllorderProduct = async (options?: {
    status?: Status | undefined;
  }): Promise<IOrderProduct> => {
    const query = server.db.orderProducts.createQueryBuilder("orderProduct");
    if (options?.status) {
      query.where("orderProduct.status = :status", { status: options.status });
    }
    return await query.getMany();
  };

  const deleteProduct = async (id: string): Promise<void> => {
    return await server.db.orderProducts.delete(id);
  };
  const updateOrderProduct = async (
    id: string,
    orderProductData: DeepPartial<orderProduct>
  ): Promise<orderProduct> => {
    const orderProduct = await server.db.orderProducts.findOne({ _id: id });
    if (!orderProduct) {
      throw new Error("Order product not found");
    }

    orderProduct.order_number =
      orderProductData.order_number || orderProduct.order_number;
    orderProduct.order_quantity =
      orderProductData.order_quantity || orderProduct.order_quantity;
    orderProduct.order_date =
      (orderProductData.order_date as Date) || orderProduct.order_date;
    orderProduct.delivery_date =
      (orderProductData.delivery_date as Date) || orderProduct.delivery_date;
    orderProduct.status = orderProductData.status || orderProduct.status;

    if (orderProductData.productO) {
      const productIds = orderProductData.productO.map((prd) => prd._id);
      const product = await server.db.products.findOne({
        where: { _id: In(productIds) },
      });
      if (product) {
        orderProductData.productO = product;
      }
    }
    return await server.db.orderProducts.save(orderProduct);
  };

  return {
    createOrderProduct,
    getAllorderProduct,
    deleteProduct,
    updateOrderProduct,
  };
};
