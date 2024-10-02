import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import ICustomerRepository from "@/core/adapters/interfaces/CustomerRepository"
import db from "../config/PostgreSql"

export default class CustomerRepository implements ICustomerRepository {
  async findByCpf(cpf: string): Promise<any | null> {
    const usuario = await db.oneOrNone(`select * from customers where cpf = $1`, [cpf])
    return !usuario ? null : usuario
  }

  async listAll(page: number = 0, limit: number = 10): Promise<IResponseListDto | null> {
    const OFFSET = limit * (page - 1)
    const usuario = await db.any(
      `select COUNT(*) OVER() AS total_count,* from customers
      LIMIT ${limit} OFFSET ${OFFSET}`,
    )

    return usuario.length === 0
      ? null
      : {
          items: usuario,
          totalItems: usuario[0].total_count,
        }
  }

  async findByEmail(email: string): Promise<any | null> {
    const usuario = await db.oneOrNone(`select * from customers where email = $1`, [email])

    return !usuario ? null : usuario
  }

  async save(customer: any): Promise<void> {
    await db.query(
      `insert into customers (id, name, email, cpf)
        values ($1, $2, $3, $4)`,
      [customer.id, customer.name, customer.email, customer.cpf],
    )
  }
}
