import Customer from "@/core/entities/Customer"
import { IResponseListDto } from "../dtos/ResponseListDto"

export default interface ICustomerRepository {
  findByEmail(email: string): Promise<any | null>
  save(customer: any): Promise<void>
  listAll(page: number, limit: number): Promise<IResponseListDto | null>
  findByCpf(cpf: any): Promise<Customer | null>
}
