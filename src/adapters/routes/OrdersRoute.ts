import OrderController from "@/adapters/controllers/OrderController"
import Id from "@/infrastructures/database/config/generateID/Id"
import OrderRepository from "@/infrastructures/database/repositories/OrderRepository"
import ExpressAdapter from "./ExpressAdapter"

export default class OrderRoutes {
  private _orderRepository: OrderRepository
  private _idGenerator: Id
  private _orderController: OrderController
  constructor(private router: any) {
    this.router = router
    this._orderRepository = new OrderRepository()
    this._idGenerator = new Id()
    this._orderController = new OrderController(this._orderRepository, this._idGenerator)
    this.initiazeRoutes()
  }

  private initiazeRoutes() {
    this.router.post("/orders/new", ExpressAdapter.adaptRoute(this.newOrder.bind(this)))
    this.router.get("/orders/list", ExpressAdapter.adaptRoute(this.listAllOrders.bind(this)))
    this.router.post("/orders/payment", ExpressAdapter.adaptRoute(this.addPaymentOrders.bind(this)))
    this.router.put(
      "/orders/update-status",
      ExpressAdapter.adaptRoute(this.updateStatus.bind(this)),
    )
    this.router.put("/orders/finalize", ExpressAdapter.adaptRoute(this.finalizeOrder.bind(this)))
  }

  private async newOrder({ body }) {
    return await this._orderController.addOrder(body)
  }

  private async listAllOrders({ query }) {
    return await this._orderController.listAllOrders(query.page, query.limit)
  }

  private async addPaymentOrders() {
    return { message: "Payment add success" }
  }

  private async updateStatus({ query }) {
    return await this._orderController.updateStatus(query)
  }

  private async finalizeOrder({ query }) {
    return await this._orderController.finalizeOrder(query.orderId)
  }
}
