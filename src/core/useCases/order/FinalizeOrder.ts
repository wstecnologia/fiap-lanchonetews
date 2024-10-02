import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import { OrderStatus } from "@/core/shared/constants/OrderStatus"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

export class FinalizeOrder {
  constructor(private _orderRepository: IOrderRepository) {}

  async execute(orderId: number): Promise<object | null> {
    const findOrder = await this._orderRepository.findOrderByNumber(orderId)

    if (!findOrder) {
      throw new AppErrors(ErrosMessage.ORDER_NOT_FOUND, 404)
    }

    await this._orderRepository.updateOrderStatus(orderId, OrderStatus.FINISHED)
    return {
      message: "Order finalized of success!",
    }
  }
}
