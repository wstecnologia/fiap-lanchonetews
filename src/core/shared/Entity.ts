export default abstract class Entity {
  private _id: string
  private _created_at: Date
  private _updated_at: Date

  constructor(id: string, createdAt: Date = new Date(), updatedAt: Date = new Date()) {
    this._id = id
    this._created_at = createdAt
    this._updated_at = updatedAt
  }

  set id(value: string) {
    this._id = value
  }

  get id(): string {
    return this._id
  }

  get createdAt(): Date {
    return this._created_at
  }

  get updatedAt(): Date {
    return this._updated_at
  }

  protected setUpdatedAt(date: Date): void {
    this._updated_at = date
  }

  update(): void {
    this.setUpdatedAt(new Date())
  }
}
