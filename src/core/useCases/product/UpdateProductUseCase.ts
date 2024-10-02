import IProductRepository from "@/core/adapters/interfaces/IProductRepository"

export default class UpdateProductUseCase {
  constructor(private _productRepository: IProductRepository) {}
  async execute(product: any): Promise<void> {
    await this._productRepository.updateProduct(product)
  }
}
