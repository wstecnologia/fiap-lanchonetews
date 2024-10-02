export interface IOrderDto {
  customerId: string
  observation: string
  items: Array<{
    productId: string
    productDescription: string
    productPrice: number
    quantity: number
  }>
}
