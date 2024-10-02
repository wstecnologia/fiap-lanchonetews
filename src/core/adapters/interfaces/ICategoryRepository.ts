import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import Category from "../../entities/Category"

export default interface ICategoryRepository {
  findById(categoryId: string): Promise<Category | null>
  registerCategory(category: Category): Promise<void>
  listAll(page: number, limit: number): Promise<IResponseListDto | null>
  countCategories(): Promise<number>
  delete(categoryId: string): Promise<void>
  updateCategory(category: Category): Promise<void>
}
