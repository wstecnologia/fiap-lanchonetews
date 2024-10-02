import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import Order from "../../entities/Order"

export default class ConsultStatusOrder {
  constructor(private _orderRepository: IOrderRepository) {}

  async execute(status: string): Promise<Order | null> {
    return this._orderRepository.findOrderByStatus(status)
  }
}
