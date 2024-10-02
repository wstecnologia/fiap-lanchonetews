import AppErrors from "../shared/error/AppErrors"
import ErrosMessage from "../shared/error/ErrosMessage"
import Cpf from "../shared/value-objects/Cpf"

interface ICustomer {
  id?: string
  name: string
  cpf: string
  email: string
}

export default class Customer {
  private _cpf: Cpf
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    cpf: string,
  ) {
    this.cpf = cpf
  }

  get cpf(): string {
    return this._cpf.value
  }

  set cpf(value: string) {
    this._cpf = new Cpf(value)
  }

  static create(customer: ICustomer) {
    if (!customer.cpf || !customer.email) {
      throw new AppErrors(ErrosMessage.ENTER_NUMBER_CPF_AND_EMAIL)
    }

    return new Customer(customer.id, customer.name, customer.email, customer.cpf)
  }
}
