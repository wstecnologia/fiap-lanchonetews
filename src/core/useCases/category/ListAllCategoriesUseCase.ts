import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import ICategoryRepository from "@/core/adapters/interfaces/ICategoryRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import PageResponse from "@/core/shared/pagination/PageResponse"

export default class ListAllCategoriesUseCase {
  constructor(private _categoryRepository: ICategoryRepository) {}

  async listAllCategories(page: number, limit: number): Promise<PageResponse<IResponseListDto>> {
    if (page <= 0) {
      throw new AppErrors(ErrosMessage.ENTER_PAGE_VALID, 404)
    }

    const categories = await this._categoryRepository.listAll(page, limit)
    if (categories.totalItems === 0 || categories.items.length === 0) {
      throw new AppErrors(ErrosMessage.LIST_NOT_LOCALIZED, 404)
    }
    return PageResponse.responseList(categories.items, categories.totalItems, page, limit)
  }
}
