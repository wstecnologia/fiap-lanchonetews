import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import IProductRepository from "@/core/adapters/interfaces/IProductRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import PageResponse from "@/core/shared/pagination/PageResponse"

export default class ListProductUseCase {
  constructor(private _productRepository: IProductRepository) {}
  async listAll(page: number, limit: number): Promise<PageResponse<IResponseListDto>> {
    if (page <= 0) {
      throw new AppErrors(ErrosMessage.ENTER_PAGE_VALID, 404)
    }

    const products = await this._productRepository.listAll(page, limit)
    if (products.totalItems === 0 || products.items.length === 0) {
      throw new AppErrors(ErrosMessage.LIST_NOT_LOCALIZED, 404)
    }
    return PageResponse.responseList(products.items, products.totalItems, page, limit)
  }
}
