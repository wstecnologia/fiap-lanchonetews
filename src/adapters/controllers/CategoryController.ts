import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import PageResponse from "@/core/shared/pagination/PageResponse"
import CountCategory from "@/core/useCases/category/CountCategoryUseCase"
import CreateCategoryUseCase from "@/core/useCases/category/CreateCategoryUseCase"
import DeleteCategoryUseCase from "@/core/useCases/category/DeleteCategoryUseCase"
import FindCategoryUseCase from "@/core/useCases/category/FindCategoryUseCase"
import ListAllCategoriesUseCase from "@/core/useCases/category/ListAllCategoriesUseCase"
import UpdateCategoryUseCase from "@/core/useCases/category/UpdateCategoryUseCase"
import ICategoryDTO from "../dtos/categoryDto"

export default class CategoryController {
  constructor(
    _categoryRepository,
    _idGenerator,

    private _countCategory = new CountCategory(_categoryRepository, _idGenerator),

    private _createCategoryUseCase = new CreateCategoryUseCase(_categoryRepository, _idGenerator),
    private _listAllCategoriesUseCase = new ListAllCategoriesUseCase(_categoryRepository),
    private _deleteCategoryUseCase = new DeleteCategoryUseCase(_categoryRepository),
    private _findCategoryUseCase = new FindCategoryUseCase(_categoryRepository),
    private _updateCategoryUseCase = new UpdateCategoryUseCase(_categoryRepository),
  ) {}

  async countCategories(): Promise<number> {
    const qtde = await this._countCategory.countCategories()
    if (!qtde) return 0
    return qtde
  }

  async registerCategory(category: ICategoryDTO): Promise<void> {
    await this._createCategoryUseCase.execute(category)
  }

  async findById(categoryId: string): Promise<ICategoryDTO> {
    try {
      const category: ICategoryDTO = await this._findCategoryUseCase.findById(categoryId)
      return category
    } catch (error) {
      throw new Error("Could not find category")
    }
  }

  public async listAllCategories(
    page: number,
    limit: number,
  ): Promise<PageResponse<IResponseListDto>> {
    return await this._listAllCategoriesUseCase.listAllCategories(page, limit)
  }

  async delete(categoryId: string): Promise<void> {
    await this._deleteCategoryUseCase.delete(categoryId)
  }

  async updateCategory(category: ICategoryDTO): Promise<void> {
    await this._updateCategoryUseCase.execute(category)
  }
}
