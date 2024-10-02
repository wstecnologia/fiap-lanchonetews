
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import { inputPaymentDto } from "../adapters/dtos/PaymentDto"
import Entity from "../shared/Entity"
import { PaymentStatus } from "../shared/constants/PaymentStatus"


export class Payment extends Entity {
  private _orderid: string
  private _amount: number
  private _status: PaymentStatus

  constructor(props: inputPaymentDto, id?: string) {
    super(id)
    this._orderid = props.orderid
    this._amount = props.amount
    this._status = props.status
    this.validate()
  }

  private validate(): void {
    if (!this._orderid) {
      throw new AppErrors(ErrosMessage.ORDERID_CANNOT_BE_EMPTY)
    }
    if (this._amount <= 0) {
      throw new AppErrors(ErrosMessage.AMOUNT_MUST_BE_GREATER_THAN_ZERO)
    }
    if (!Object.values(PaymentStatus).includes(this._status)) {
      throw new AppErrors(ErrosMessage.INVALID_PAYMENT_STATUS)
    }
  }

  get orderid(): string {
    return this._orderid
  }

  get amount(): number {
    return this._amount
  }

  get status(): PaymentStatus {
    return this._status
  }

  public completePayment(): void {
    if (this._status !== PaymentStatus.Pending) {
      throw new AppErrors(ErrosMessage.INVALID_PAYMENT_FAILURE_STATUS)
    }
    this._status = PaymentStatus.Completed
  }

  public failPayment(): void {
    if (this._status !== PaymentStatus.Pending) {
      throw new AppErrors(ErrosMessage.INVALID_PAYMENT_FAILURE_STATUS)
    }
    this._status = PaymentStatus.Failed
  }

  public isCompleted(): boolean {
    return this._status === PaymentStatus.Completed
  }

  public isFailed(): boolean {
    return this._status === PaymentStatus.Failed
  }
}
