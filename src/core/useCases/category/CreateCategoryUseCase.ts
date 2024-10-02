import ICategoryRepository from "@/core/adapters/interfaces/ICategoryRepository"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import Category from "../../entities/Category"

export default class CreateCategoryUseCase {
  constructor(
    private _categoryRepository: ICategoryRepository,
    private _idGenerator: IIdGenerator,
  ) { }

  async execute(category: any): Promise<void> {
    const existingCategory = await this._categoryRepository.findById(category.id)

    if (existingCategory) {
      throw new AppErrors(ErrosMessage.CATEGORY_ALREADY_EXISTS)
    }

    const newCategory = Category.factory({
      id: this._idGenerator.gerar(),
      name: category.name,
      description: category.description,
      active: category.active,
    })

    await this._categoryRepository.registerCategory(newCategory)
  }
}
