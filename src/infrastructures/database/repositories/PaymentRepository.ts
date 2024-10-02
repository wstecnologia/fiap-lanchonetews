import IPaymentRepository from "@/core/adapters/interfaces/IPaymentRepository"
import { Payment } from "@/core/entities/Payment"
import { OutputStatusPayment } from "@/infrastructures/dtos/PaymentsDto"
import db from "../config/PostgreSql"

export class PaymentRepository implements IPaymentRepository {
  async save(payment: Payment): Promise<void> {
    await db.query(
      `INSERT INTO payments (id, orderid, amount, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        payment.id,
        payment.orderid,
        payment.amount,
        payment.status,
        payment.createdAt,
        payment.updatedAt,
      ],
    )
  }

  async findById(paymentId: string): Promise<Payment | null> {
    const query = "SELECT * from  payments WHERE id = $1"
    const payment = await db.oneOrNone(query, [paymentId])
    if (!payment) {
      return null
    }
    return payment
  }

  async update(payment: Payment): Promise<Payment | null> {
    try {
      await db.query(
        `UPDATE payments  SET  orderid=$2, amount=$3, status=$4, created_at=$5, updated_at=$6 WHERE id=$1`,
        [
          payment.id,
          payment.orderid,
          payment.amount,
          payment.status,
          payment.createdAt,
          payment.updatedAt,
        ],
      )
      return payment
    } catch (error) {
      return null
    }
  }

  async getStatusPayment(orderId: number): Promise<OutputStatusPayment | null> {
    const statusPayment = await db.oneOrNone(
      `
      Select p.id paymentId, o.number orderNumber, p.orderid, p.status, p.amount from payments p
        inner join orders o on o.id=p.orderid
      where o.number = $1`,
      [orderId],
    )
    if (!statusPayment) {
      return null
    }
    return statusPayment
  }
}
