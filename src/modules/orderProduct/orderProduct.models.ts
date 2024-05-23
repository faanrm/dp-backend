import { OrderProductFactory } from "./orderProduct.interface";
import { Product } from "../products/products.entity";
import { orderProduct } from "./orderProduct.entity";
import { Status } from "./orderProduct.interface";
import { v4 as uuid } from "uuid";
class OrderProductFactoryImpl implements OrderProductFactory {
  createOrderProduct(product: Product, orderQuantity: number): orderProduct {
    const orderDate = new Date();
    const deliveryDate = new Date(
      orderDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    const orderNumber = Math.floor(Math.random() * 1000000);
    const status = Status.in_progress;

    const orderProductData = new orderProduct();
    orderProductData._id = uuid();
    orderProductData.order_quantity = orderQuantity;
    orderProductData.order_date = orderDate;
    orderProductData.delivery_date = deliveryDate;
    orderProductData.status = status;
    orderProductData.order_number = orderNumber;
    orderProductData.productO = [product];

    return orderProductData;
  }
}
const factoryOrder = new OrderProductFactoryImpl();
export default factoryOrder;
