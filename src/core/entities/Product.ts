import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

interface IProduct {
  name: string
  description: string
  price: number
  categoryId: string
  image: string
  active: boolean
  id: string
}
export default class Product {
  private _id: string
  private _name: string
  private _description: string
  private _price: number
  private _categoryId: string
  private _image: string
  private _active: boolean

  constructor(
    name: string,
    description: string,
    price: number,
    categoryId: string,
    image: string,
    active: boolean,
    id: string,
  ) {
    this._id = id

    this.setName(name)
    this.setDescription(description)
    this.setPrice(price)
    this.setCategoryId(categoryId)
    this.setImage(image)
    this.setActive(active)
  }

  static factory(product: IProduct): Product {
    return new Product(
      product.name,
      product.description,
      product.price,
      product.categoryId,
      product.image,
      product.active,
      product.id,
    )
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get price(): number {
    return this._price
  }

  get categoryId(): string {
    return this._categoryId
  }

  get image(): string {
    return this._image
  }

  get active(): boolean {
    return this._active
  }

  private setName(value: string) {
    if (!value) {
      throw new AppErrors(ErrosMessage.INVALID_NAME)
    }
    this._name = value
  }

  private setDescription(value: string) {
    this._description = value
  }

  private setPrice(value: number) {
    if (value <= 0) {
      throw new AppErrors(ErrosMessage.INVALID_PRICE)
    }
    this._price = value
  }

  private setCategoryId(value: string) {
    this._categoryId = value
  }

  private setImage(value: string) {
    this._image = value
  }

  private setActive(value: boolean) {
    this._active = value
  }

  updatePrice(newPrice: number) {
    this.setPrice(newPrice)
  }

  updateDescription(newDescription: string) {
    this.setDescription(newDescription)
  }
}
