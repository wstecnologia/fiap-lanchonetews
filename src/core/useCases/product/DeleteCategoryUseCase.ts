import IProductRepository from "@/core/adapters/interfaces/IProductRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

export default class DeleteProductUseCase {
  constructor(private _productRepository: IProductRepository) {}

  async execute(productId: string): Promise<void> {
    const product = await this._productRepository.findById(productId)
    if (!product) {
      throw new AppErrors(ErrosMessage.CATEGORY_NOT_FOUND)
    }
    await this._productRepository.delete(productId)
  }
}
