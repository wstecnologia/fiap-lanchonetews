import { Payment } from "@/core/entities/Payment"
import { OutputStatusPayment } from "../dtos/OutputStatusPayment"

export default interface IPaymentRepository {
  save(payment: Payment): Promise<void>
  findById(paymentId: string): Promise<Payment | null>
  update(payment: Payment): Promise<Payment | null>
  getStatusPayment(orderId: number): Promise<OutputStatusPayment | null>
}
