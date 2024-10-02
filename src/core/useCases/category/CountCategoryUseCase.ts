
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import CategoryRepository from "@/infrastructures/database/repositories/CategoryRepository"

export default class CountCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private idGenerator: IIdGenerator,
  ) {}

  async countCategories(): Promise<number> {
    return await this.categoryRepository.countCategories()
  }
}
