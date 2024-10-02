import ICustomerRepository from "@/core/adapters/interfaces/CustomerRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import Cpf from "@/core/shared/value-objects/Cpf"

type Output = {
  name: string
  cpf: string
  email: string
}

export default class GetCustomerCpfUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(cpf: string): Promise<Output | null> {
    const returnValidation = await this.customerRepository.findByCpf(new Cpf(cpf).value)

    if (!returnValidation) throw new AppErrors(ErrosMessage.USER_NOT_LOCATED, 401)

    return {
      name: returnValidation.name,
      cpf: returnValidation.cpf,
      email: returnValidation.email,
    }
  }
}
