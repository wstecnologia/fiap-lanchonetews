import { inputPaymentDto, outputPaymentDto } from "@/core/adapters/dtos/PaymentDto"
import IPaymentRepository from "@/core/adapters/interfaces/IPaymentRepository"
import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import { Payment } from "@/core/entities/Payment"
import { OrderStatus } from "@/core/shared/constants/OrderStatus"
import { PaymentStatus } from "@/core/shared/constants/PaymentStatus"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

export class UpdateStatusPaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute(paymentId: string, status: PaymentStatus): Promise<outputPaymentDto> {
    const payment = await this.paymentRepository.findById(paymentId)
    if (!payment) {
      throw new AppErrors(ErrosMessage.PAYMENT_NOT_FOUND)
    }

    const paymentDto: inputPaymentDto = {
      orderid: payment.orderid,
      amount: payment.amount,
      status: status,
    }

    const order = await this.orderRepository.findByOrderId(paymentDto.orderid)

    if (!order) {
      throw new AppErrors(ErrosMessage.ORDER_NOT_FOUND)
    }

    if (status !== PaymentStatus.Completed && status === PaymentStatus.Failed) {
      throw new AppErrors(ErrosMessage.INVALID_PAYMENT_STATUS)
    }

    const paymentEntity = new Payment(paymentDto, paymentId)
    await this.paymentRepository.update(paymentEntity)
    order.situationId = OrderStatus.RECEIVED
    this.orderRepository.updateOrderStatus(order.number, order.situationId)

    return {
      id: paymentId,
      orderid: payment.orderid,
      amount: payment.amount,
      status: status,
    }
  }
}
