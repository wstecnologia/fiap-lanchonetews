import { OutputStatusPayment } from "@/core/adapters/dtos/OutputStatusPayment"
import IPaymentRepository from "@/core/adapters/interfaces/IPaymentRepository"

export class GetStatusPaymentUseCase {
  constructor(private paymentRepository: IPaymentRepository) {}

  async execute(orderId: number): Promise<OutputStatusPayment | null> {
    return await this.paymentRepository.getStatusPayment(orderId)
  }
}
