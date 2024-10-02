import ICustomerRepository from "@/core/adapters/interfaces/CustomerRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import PageResponse from "@/core/shared/pagination/PageResponse"

export default class ListAllCustomersUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(page: number, limit: number): Promise<PageResponse<any>> {
    if (page <= 0) {
      throw new AppErrors(ErrosMessage.ENTER_PAGE_VALID, 404)
    }

    const lstCustomers = await this.customerRepository.listAll(page, limit)

    if (lstCustomers.items.length === 0) {
      throw new AppErrors(ErrosMessage.LIST_NOT_LOCALIZED, 404)
    }

    return PageResponse.responseList(lstCustomers.items, lstCustomers.totalItems, page, limit)
  }
}
