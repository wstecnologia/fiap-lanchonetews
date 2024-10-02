import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import Order from "../../entities/Order"

export default interface IOrderRepository {
  createdOrder(order: Order): Promise<number | null>
  numberOrder(): Promise<number | null>
  listAllOrders(page: number, limit: number): Promise<IResponseListDto | null>
  updateOrderStatus(numberOrder: number, status: string): Promise<object | null>
  countOrders(): Promise<number | null>
  findOrderByNumber(orderNumber: number): Promise<Order | null>
  findOrderByStatus(status: string): Promise<Order | null>
  findByOrderId(id: string): Promise<Order | null>
}
