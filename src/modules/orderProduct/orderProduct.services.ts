import { orderProduct } from "./orderProduct.entity";
import { IOrderProduct } from "./orderProduct.interface";
import { DeepPartial } from "typeorm";
import { Status } from "./orderProduct.interface";
export const orderProductServices = (server) => {
  const createOrderProduct = async (
    orderProductData: DeepPartial<IOrderProduct>
  ): Promise<IOrderProduct> => {
    const createdOrderProduct = new orderProduct().clone();
    createdOrderProduct.order_number = orderProductData.order_number;
    createdOrderProduct.order_quantity = orderProductData.order_quantity;
    createdOrderProduct.order_date = orderProductData.order_date as Date;
    createdOrderProduct.delivery_date = orderProductData.delivery_date as Date;
    createdOrderProduct.status = orderProductData.status;
    if (orderProductData.product) {
      const product = await server.db.products.findOne(
        orderProductData.product._id
      );
      if (product) {
        createdOrderProduct.product = orderProductData.product;
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
    orderProductData: DeepPartial<IOrderProduct>
  ): Promise<IOrderProduct> => {
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

    if (orderProductData.product) {
      const product = await server.db.products.findOne(
        orderProductData.product._id
      );
      if (product) {
        orderProduct.product = orderProductData.product;
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
