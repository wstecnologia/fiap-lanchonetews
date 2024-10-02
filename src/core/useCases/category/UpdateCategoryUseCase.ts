import ICategoryRepository from "@/core/adapters/interfaces/ICategoryRepository"

export default class UpdateCategoryUseCase {
  constructor(private _categoryRepository: ICategoryRepository) {}

  async execute(category: any): Promise<void> {
    await this._categoryRepository.updateCategory(category)
  }
}
