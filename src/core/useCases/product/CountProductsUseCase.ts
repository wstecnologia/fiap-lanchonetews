import IProductRepository from "@/core/adapters/interfaces/IProductRepository"

export default class CountProductUseCase {
  constructor(private _productRepository: IProductRepository) {}

  async countCategories(): Promise<number> {
    return await this._productRepository.countProducts()
  }
}
