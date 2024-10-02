import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import IProductRepository from "@/core/adapters/interfaces/IProductRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import PageResponse from "@/core/shared/pagination/PageResponse"
import Product from "../../entities/Product"

export default class FindProductUseCase {
  constructor(private _productRepository: IProductRepository) {}

  async findById(productId: string): Promise<Product> {
    const product = await this._productRepository.findById(productId)
    if (!product) throw new AppErrors(ErrosMessage.PRODUCT_NOT_LOCALIZED, 400)
    return product
  }

  async findByCategory(
    categoryId: string,
    page: number,
    limit: number,
  ): Promise<PageResponse<IResponseListDto>> {
    const products = await this._productRepository.findByCategory(categoryId, page, limit)
    if (!products) {
      throw new AppErrors(ErrosMessage.LIST_NOT_LOCALIZED, 404)
    } else if (!products || products.totalItems === 0 || products.items.length === 0) {
      throw new AppErrors(ErrosMessage.LIST_NOT_LOCALIZED, 404)
    }
    return PageResponse.responseList(products.items, products.totalItems, page, limit)
  }
}
