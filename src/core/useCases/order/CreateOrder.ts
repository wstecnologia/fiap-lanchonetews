import { ICreateOrder, InputCreateOrder } from "@/core/adapters/dtos/CreateOrder"
import { IResponseRegisterDto } from "@/core/adapters/dtos/ResponseRegisterDto"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import Order from "../../entities/Order"
import OrderItems from "../../entities/OrderItems"

export class CreateOrder implements ICreateOrder {
  constructor(
    private _orderRepository: IOrderRepository,
    private _idGenerator: IIdGenerator,
  ) {}

  async execute(order: InputCreateOrder): Promise<IResponseRegisterDto> {
    const orderNumber = await this._orderRepository.numberOrder()

    const orderId = this._idGenerator.gerar()

    const itemsWithId = order.items.map(item => {
      const orderItem = OrderItems.create({
        numberOrder: orderNumber,
        quantity: item.quantity,
        productId: item.productId,
        productDescription: item.productDescription,
        productPrice: item.productPrice,
        active: true,
      })

      orderItem.id = this._idGenerator.gerar()
      return orderItem
    })

    const ordernew = Order.create({
      number: orderNumber,
      items: itemsWithId,
      observation: order.observation,
      customerId: order.customerId,
    })

    ordernew.id = orderId

    await this._orderRepository.createdOrder(ordernew)

    return {
      object: orderNumber,
      message: "Order placed successfully",
    }
  }
}
