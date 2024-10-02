import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

interface ICategory {
  id?: string
  name: string
  description?: string
  active: boolean
}

export default class Category {
  private _id: string
  private _name: string
  private _description: string
  private _active: boolean

  constructor(name: string, description: string, active: boolean, id?: string) {
    this.setId(id)
    this._name = name
    this._description = description || ""
    this._active = active
  }

  static factory(category: ICategory): Category {
    return new Category(category.name, category.description || "", category.active, category.id)
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

  get active(): boolean {
    return this._active
  }

  private setId(id?: string) {
    if (id) {
      this._id = id
    }
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

  updateName(newName: string) {
    this.setName(newName)
  }

  updateDescription(newDescription: string) {
    this.setDescription(newDescription)
  }
}
