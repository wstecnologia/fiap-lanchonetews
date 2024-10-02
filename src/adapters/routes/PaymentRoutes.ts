import Id from "@/infrastructures/database/config/generateID/Id"
import OrderRepository from "@/infrastructures/database/repositories/OrderRepository"
import { PaymentRepository } from "@/infrastructures/database/repositories/PaymentRepository"
import PaymentController from "../controllers/PaymentController"
import ExpressAdapter from "./ExpressAdapter"

class PaymentRoutes {
  private _paymentController: PaymentController

  constructor(private _router: any) {
    this._paymentController = new PaymentController(
      new PaymentRepository(),
      new OrderRepository(),
      new Id(),
    )

    this.initializeRoutes()
  }

  private initializeRoutes() {
    this._router.post("/payment", ExpressAdapter.adaptRoute(this.createPayment.bind(this)))
    this._router.put("/payment-status", ExpressAdapter.adaptRoute(this.updateStatus.bind(this)))
    this._router.get(
      "/payment-get-status",
      ExpressAdapter.adaptRoute(this.getStatusPayment.bind(this)),
    )
  }

  private async createPayment({ body }: { body: any }) {
    const { orderId, amount } = body
    return this._paymentController.createPayment(orderId, amount)
  }

  private async updateStatus({ query }: { query: any }) {
    return this._paymentController.updateStatus(query.paymentId, query.status)
  }

  private async getStatusPayment({ query }: { query: any }) {
    return this._paymentController.getStatusPayment(query.orderId)
  }
}

export default PaymentRoutes
