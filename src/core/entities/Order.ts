import { OrderStatus } from "@/core/shared/constants/OrderStatus"
import Entity from "../shared/Entity"
import OrderItems from "./OrderItems"

interface IOrder {
  number: number
  customerId: string
  items: OrderItems[]
  situationId?: string
  observation: string
}

enum DefaultCustomer {
  ANONYMOUS = "eefdd3d4-97af-4ae6-bdc7-2f8ec461b28c",
}

export default class Order extends Entity {
  constructor(
    readonly number: number,
    readonly customerId: string,
    readonly items: OrderItems[] = [],
    private _situationId: string,
    readonly observation: string,
  ) {
    super("")
    this._situationId = this.validateSituation(_situationId)
    this.customerId = this.validateCustomer(customerId)
  }

  static create(order: IOrder) {
    return new Order(
      order.number,
      order.customerId,
      order.items,
      order.situationId,
      order.observation,
    )
  }

  set situationId(value: string) {
    this.situationId = this.validateSituation(value)
  }

  get situationId(): string {
    return this._situationId
  }

  addItemOrder(item: OrderItems) {
    this.items.push(item)
  }

  private validateSituation(value: string): string {
    if (!value || value === "") {
      return OrderStatus.AWAITING_PAYMENT
    } else {
      return value
    }
  }

  private validateCustomer(value: string): string {
    if (value === "") {
      return DefaultCustomer.ANONYMOUS
    } else {
      return value
    }
  }
}
