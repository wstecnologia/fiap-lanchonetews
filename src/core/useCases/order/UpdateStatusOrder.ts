import { IResponseMessageDto } from "@/core/adapters/dtos/ResponseMessageDto"
import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import { OrderStatus } from "@/core/shared/constants/OrderStatus"

export class UpdateStatusOrder {
  constructor(private _orderRepository: IOrderRepository) {}

  async execute(orderId: number, status: OrderStatus): Promise<IResponseMessageDto> {
    await this._orderRepository.updateOrderStatus(orderId, status)
    return {
      message: "Order updated successfully!",
    }
  }
}
