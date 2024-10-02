import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import Entity from "../shared/Entity"
type ICreateOrderItems = {
  numberOrder: number
  quantity: number
  productId: string
  productDescription: string
  productPrice: number
  active: boolean
}

export default class OrderItems extends Entity {
  private _quantity: number

  constructor(
    private _numberOrder: number,
    quantity: number,
    private _productId: string,
    private _productDescription: string,
    private _productPrice: number,
    private _active: boolean,
  ) {
    super("")
    this._quantity = this.validateQuantity(quantity)
  }

  static create(orderItens: ICreateOrderItems) {
    return new OrderItems(
      orderItens.numberOrder,
      orderItens.quantity,
      orderItens.productId,
      orderItens.productDescription,
      orderItens.productPrice,
      orderItens.active,
    )
  }

  //getters

  get numberOrder(): number {
    return this._numberOrder
  }

  get quantity(): number {
    return this._quantity
  }

  get productId(): string {
    return this._productId
  }

  get productDescription(): string {
    return this._productDescription
  }

  get productPrice(): number {
    return this._productPrice
  }

  get active(): boolean {
    return this._active
  }

  //setters

  set numberOrder(value: number) {
    this._numberOrder = value
  }

  set quantity(value: number) {
    this._quantity = this.validateQuantity(value)
  }

  set productId(value: string) {
    this._productId = value
  }

  set productDescription(value: string) {
    this._productDescription = value
  }

  set productPrice(value: number) {
    this._productPrice = value
  }

  set active(value: boolean) {
    this._active = value
  }

  private validateQuantity(value: number): number {
    if (typeof value !== "number" || isNaN(value) || value <= 0) {
      throw new AppErrors(ErrosMessage.ITEMS_WITH_QUANTITY_ZEROED)
    }
    return value
  }
}
