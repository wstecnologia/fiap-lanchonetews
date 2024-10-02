import { InputCustomerDto, OutputCustomerDto } from "@/core/adapters/dtos/CustomerDto"
import ICustomerRepository from "@/core/adapters/interfaces/CustomerRepository"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import Customer from "@/core/entities/Customer"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

export default class RegisterCustomerUseCase {
  constructor(
    private customerRepository: ICustomerRepository,
    private iGenerator: IIdGenerator,
  ) {}

  async execute(newCustomers: InputCustomerDto): Promise<OutputCustomerDto> {
    const newCustomer = Customer.create({
      id: this.iGenerator.gerar(),
      name: newCustomers.name,
      email: newCustomers.email,
      cpf: newCustomers.cpf,
    })

    const existingCustomer = await this.customerRepository.findByCpf(newCustomer.cpf)

    if (existingCustomer) {
      throw new AppErrors(ErrosMessage.USER_ALREADY_EXISTS)
    }

    await this.customerRepository.save(newCustomer)

    return {
      id: newCustomer.id,
      cpf: newCustomer.cpf,
      email: newCustomer.email,
      name: newCustomer.name,
    }
  }
}
