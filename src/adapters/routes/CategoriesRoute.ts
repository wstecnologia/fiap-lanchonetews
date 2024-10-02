import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import Id from "@/infrastructures/database/config/generateID/Id"
import CategoryRepository from "@/infrastructures/database/repositories/CategoryRepository"
import CategoryController from "../controllers/CategoryController"
import ExpressAdapter from "./ExpressAdapter"

class CategoryRoutes {
  private _categoryRepository: CategoryRepository
  private _categoryController: CategoryController
  private _idGenerator: IIdGenerator

  constructor(private _router: any) {
    this._categoryRepository = new CategoryRepository()
    this._idGenerator = new Id()
    this._categoryController = new CategoryController(this._categoryRepository, this._idGenerator)
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this._router.post("/categories", ExpressAdapter.adaptRoute(this.registerCategory.bind(this)))
    this._router.get("/categories/id", ExpressAdapter.adaptRoute(this.findById.bind(this)))
    this._router.get("/categories", ExpressAdapter.adaptRoute(this.listAll.bind(this)))
    this._router.delete("/categories", ExpressAdapter.adaptRoute(this.deleteCategory.bind(this)))
    this._router.put("/categories", ExpressAdapter.adaptRoute(this.updateCategory.bind(this)))
  }

  private async registerCategory({ body }: { body: any }) {
    return this._categoryController.registerCategory(body)
  }

  private async findById({ query }: { query: any }) {
    const { id } = query
    return this._categoryController.findById(id.toString())
  }

  private async listAll({ query }: { query: any }) {
    const { page, limit } = query
    return this._categoryController.listAllCategories(Number(page), Number(limit))
  }

  private async deleteCategory({ query }: { query: any }) {
    const { id } = query
    await this._categoryController.delete(id)
  }

  private async updateCategory({ body }: { body: any }) {
    return this._categoryController.updateCategory(body)
  }
}
export default CategoryRoutes
