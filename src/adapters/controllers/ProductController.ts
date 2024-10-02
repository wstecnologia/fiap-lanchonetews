import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import PageResponse from "@/core/shared/pagination/PageResponse"
import CretateProductUseCase from "@/core/useCases/product/CreateProductUseCase"
import DeleteProductUseCase from "@/core/useCases/product/DeleteCategoryUseCase"
import FindProductUseCase from "@/core/useCases/product/FindProductUseCase"
import ListProductUseCase from "@/core/useCases/product/ListProductUseCase"
import UpdateProductUseCase from "@/core/useCases/product/UpdateProductUseCase"
import ProductRepository from "@/infrastructures/database/repositories/ProductRepository"
import IProductDTO from "../dtos/productDto"



export default class ProductController {
  private _cretateProductUseCase: CretateProductUseCase
  private _findProductUseCase: FindProductUseCase
  private _listProductUseCase: ListProductUseCase
  private _deleteProductUseCase: DeleteProductUseCase
  private _updateProductUseCase: UpdateProductUseCase
  constructor(
    private _productRepository: ProductRepository,
    private _idGenerator: IIdGenerator,
  ) {
    this._cretateProductUseCase = new CretateProductUseCase(
      this._productRepository,
      this._idGenerator,
    )
    this._findProductUseCase = new FindProductUseCase(this._productRepository)
    this._listProductUseCase = new ListProductUseCase(this._productRepository)
    this._deleteProductUseCase = new DeleteProductUseCase(this._productRepository)
  }

  async registerProduct(product: IProductDTO): Promise<void> {
    await this._cretateProductUseCase.execute(product)
  }

  async findById(productId: string): Promise<IProductDTO[]> {
    const product = await this._findProductUseCase.findById(productId)
    return [product]
  }

  async findByCategory(
    categoryId: string,
    page: number,
    limit: number,
  ): Promise<PageResponse<IResponseListDto>> {
    return await this._findProductUseCase.findByCategory(categoryId, page, limit)
  }

  async listAll(page: number, limit): Promise<PageResponse<IResponseListDto>> {
    const products = await this._listProductUseCase.listAll(page, limit)
    return products
  }

  async delete(productId: string): Promise<void> {
    await this._deleteProductUseCase.execute(productId)
  }

  async updateProduct(product: IProductDTO): Promise<void> {
    await this._updateProductUseCase.execute(product)
  }
}
