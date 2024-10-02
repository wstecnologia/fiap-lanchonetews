import CustomerController from "@/adapters/controllers/CustomerController"
import Id from "@/infrastructures/database/config/generateID/Id"
import CustomerRepository from "@/infrastructures/database/repositories/CustomerRepository"
import ExpressAdapter from "./ExpressAdapter"

class CustomersRoutes {
  private _customerRepository: CustomerRepository
  private _idGenerator: Id
  private _customerController: CustomerController
  constructor(private _router: any) {
    this._customerRepository = new CustomerRepository()
    this._idGenerator = new Id()
    this._customerController = new CustomerController(this._customerRepository, this._idGenerator)
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this._router.post("/customers", ExpressAdapter.adaptRoute(this.register.bind(this)))
    this._router.get("/customers", ExpressAdapter.adaptRoute(this.listAll.bind(this)))
    this._router.get("/customers/cpf", ExpressAdapter.adaptRoute(this.getCustomerCpf.bind(this)))
  }

  private async register({ body }: { body: any }) {
    return await this._customerController.register(body)
  }

  private async listAll({ query }: { query: any }) {
    return await this._customerController.listAll(query.page, query.limit)
  }

  private async getCustomerCpf({ query }: { query: any }) {
    const { cpf } = query
    return await this._customerController.getCustomerCpf(cpf.toString())
  }
}

export default CustomersRoutes
