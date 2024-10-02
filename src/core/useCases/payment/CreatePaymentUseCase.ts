import { inputPaymentDto } from "@/core/adapters/dtos/PaymentDto"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import IPaymentRepository from "@/core/adapters/interfaces/IPaymentRepository"
import { Payment } from "@/core/entities/Payment"
import { PaymentStatus } from "@/core/shared/constants/PaymentStatus"

export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private idGenerator: IIdGenerator,
  ) {}

  async execute(orderId: string, amount: number): Promise<Payment> {
    const paymentDto: inputPaymentDto = {
      orderid: orderId,
      amount: amount,
      status: PaymentStatus.Pending,
    }

    const payment = new Payment(paymentDto, this.idGenerator.gerar())

    await this.paymentRepository.save(payment)
    return payment
  }
}
