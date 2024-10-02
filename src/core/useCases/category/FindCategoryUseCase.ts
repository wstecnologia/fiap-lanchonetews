import ICategoryRepository from "@/core/adapters/interfaces/ICategoryRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import Category from "../../entities/Category"

export default class FindCategoryUseCase {
  constructor(private _categoryRepository: ICategoryRepository) { }

  async findById(id: string): Promise<Category> {
    const category = await this._categoryRepository.findById(id)
    if (!category) {
      throw new AppErrors(ErrosMessage.CATEGORY_NOT_FOUND)
    }
    return category
  }
}
