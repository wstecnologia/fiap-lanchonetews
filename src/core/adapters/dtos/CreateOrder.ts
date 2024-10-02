import { IResponseRegisterDto } from "./ResponseRegisterDto"

export interface ICreateOrder {
  execute(order: InputCreateOrder): Promise<IResponseRegisterDto>
}

export interface InputCreateOrder {
  customerId: string
  observation: string
  items: Array<{
    productId: string
    productDescription: string
    productPrice: number
    quantity: number
  }>
}
