import ICustomerRepository from "@/core/adapters/interfaces/CustomerRepository"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import GetCustomerCpfUseCase from "@/core/useCases/customer/GetCustomerCpfUseCase"
import ListAllCustomersUseCase from "@/core/useCases/customer/ListAllCustomersUseCase"
import RegisterCustomerUseCase from "@/core/useCases/customer/RegisterCustomerUseCase"
import { ICustomerDto } from "../dtos/curstomerDto"

export default class CustomerController {
  private _getCustomerCpfUseCase: GetCustomerCpfUseCase
  private _listAllCustomerUseCase: ListAllCustomersUseCase
  private _registerCustomerUseCase: RegisterCustomerUseCase

  constructor(
    private _customerRepository: ICustomerRepository,
    private _idGenerator: IIdGenerator,
  ) {
    this._getCustomerCpfUseCase = new GetCustomerCpfUseCase(this._customerRepository)
    this._listAllCustomerUseCase = new ListAllCustomersUseCase(this._customerRepository)
    this._registerCustomerUseCase = new RegisterCustomerUseCase(
      this._customerRepository,
      this._idGenerator,
    )
  }

  async register(customer: ICustomerDto) {
    return await this._registerCustomerUseCase.execute(customer)
  }

  async listAll(page: number = 0, limit: number) {
    return await this._listAllCustomerUseCase.execute(page, limit)
  }

  async getCustomerCpf(cpf: string) {
    return await this._getCustomerCpfUseCase.execute(cpf)
  }
}
