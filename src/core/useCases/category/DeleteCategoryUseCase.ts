import ICategoryRepository from "@/core/adapters/interfaces/ICategoryRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

export default class DeleteCategoryUseCase {
  constructor(private _categoryRepository: ICategoryRepository) {}

  async delete(categoryId: string): Promise<void> {
    const category = await this._categoryRepository.findById(categoryId)
    if (!category) {
      throw new AppErrors(ErrosMessage.CATEGORY_NOT_FOUND)
    }
    await this._categoryRepository.delete(categoryId)
  }
}
