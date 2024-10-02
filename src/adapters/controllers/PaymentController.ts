import { OutputStatusPayment } from "@/core/adapters/dtos/OutputStatusPayment"
import { outputPaymentDto } from "@/core/adapters/dtos/PaymentDto"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import IPaymentRepository from "@/core/adapters/interfaces/IPaymentRepository"
import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import { Payment } from "@/core/entities/Payment"
import { PaymentStatus } from "@/core/shared/constants/PaymentStatus"
import { CreatePaymentUseCase } from "@/core/useCases/payment/CreatePaymentUseCase"
import { GetStatusPaymentUseCase } from "@/core/useCases/payment/GetStatusPaymentUseCase"
import { UpdateStatusPaymentUseCase } from "@/core/useCases/payment/UpdateStatusPaymentUseCase"

export default class PaymentController {
  private _createPaymentUseCase: CreatePaymentUseCase
  private _updatePaymentUseCase: UpdateStatusPaymentUseCase
  private _getStatusPaymentUseCase: GetStatusPaymentUseCase

  constructor(
    paymentRepository: IPaymentRepository,
    orderRepository: IOrderRepository,
    idGenerator: IIdGenerator,
  ) {
    this._createPaymentUseCase = new CreatePaymentUseCase(paymentRepository, idGenerator)
    this._updatePaymentUseCase = new UpdateStatusPaymentUseCase(paymentRepository, orderRepository)
    this._getStatusPaymentUseCase = new GetStatusPaymentUseCase(paymentRepository)
  }

  async createPayment(orderId: string, amount: number): Promise<Payment> {
    return await this._createPaymentUseCase.execute(orderId, amount)
  }

  async updateStatus(paymentId: string, status: PaymentStatus): Promise<outputPaymentDto> {
    return await this._updatePaymentUseCase.execute(paymentId, status)
  }
  async getStatusPayment(orderId: number): Promise<OutputStatusPayment> {
    return await this._getStatusPaymentUseCase.execute(orderId)
  }
}
