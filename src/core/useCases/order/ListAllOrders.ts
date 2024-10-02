import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import PageResponse from "@/core/shared/pagination/PageResponse"


export class ListAllOrders {
  constructor(private _orderRepository: IOrderRepository) { }

  async execute(page: number, limit: number): Promise<PageResponse<any> | null> {
    if (page <= 0) {
      throw new AppErrors(ErrosMessage.ENTER_PAGE_VALID, 404)
    }
    const result = await this._orderRepository.listAllOrders(page, limit)

    if (result.items.length === 0) {
      throw new AppErrors(ErrosMessage.LIST_NOT_LOCALIZED, 404)
    }

    return PageResponse.responseList(result.items, result.totalItems, page, limit)
  }
}
