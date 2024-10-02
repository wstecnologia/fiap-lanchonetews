import {
  InpuCreateOrderItemDto,
  InputCreateOrderDto,
} from "@/core/adapters/dtos/InputCreateOrderDto"
import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import Order from "@/core/entities/Order"
import db from "../config/PostgreSql"

export default class OrderRepository implements IOrderRepository {
  async findByOrderId(id: string): Promise<Order | null> {
    const order = await db.oneOrNone(`select * from orders where id = $1 `, [id])

    return order
  }

  async findOrderByNumber(orderNumber: number): Promise<Order | null> {
    const order = await db.oneOrNone(`SELECT * FROM orders where number = $1 `, [orderNumber])

    return order
  }

  async findOrderByStatus(status: string): Promise<Order | null> {
    const order = await db.oneOrNone(
      `SELECT * FROM orders where situationid = $1
      order by updated_at desc limit 1`,
      [status],
    )

    return order
  }

  async countOrders(): Promise<number> {
    const qtde = await db.oneOrNone(`
        SELECT
          count(o.id) total
        FROM orders o
        inner join situations s on s.id = o.situationid
        inner join customers c on c.id = o.customerid `)
    if (!qtde) return 0

    return qtde.total
  }

  async updateOrderStatus(numberOrder: number, status: string): Promise<object | null> {
    return await db.query(
      `UPDATE orders SET situationId = $1, updated_at = CURRENT_TIMESTAMP WHERE number = $2`,
      [status, numberOrder],
    )
  }

  async listAllOrders(page: number = 1, limit = 10): Promise<IResponseListDto | null> {
    const OFFSET = limit * (page - 1)

    const orders = await db.any(
      `SELECT
        COUNT(*) OVER() AS total_count,
        o.id,
        o.number,
        o.created_at,
        o.updated_at,
        o.observation,
        s.description situation,
        c.name customerName
      FROM orders o
        inner join situations s on s.id = o.situationid
        inner join customers c on c.id = o.customerid
      where o.situationid <> '3f4798e6-1f03-411e-b99b-73833c104255'
      order by
       CASE
        WHEN s.description = 'Pronto' THEN 1
        WHEN s.description = 'Em Preparação' THEN 2
        WHEN s.description = 'Recebido' THEN 3
        ELSE 4
      END,
      o.updated_at
      LIMIT ${limit} OFFSET ${OFFSET}`,
    )
    if (!orders || orders.length === 0)
      return {
        items: [],
        totalItems: 0,
      }
    return {
      items: orders,
      totalItems: orders[0].total_count,
    }
  }

  async createdOrder(order: InputCreateOrderDto): Promise<number | null> {
    await db.query(
      `insert into orders (id, number, created_at, customerid, situationid, observation)
          values ($1, $2, $3, $4, $5, $6)`,
      [
        order.id,
        order.number,
        order.createdAt,
        order.customerId,
        order.situationId,
        order.observation,
      ],
    )

    for (let i = 0; i < order.items.length; i++) {
      let item = order.items[i]
      item.numberOrder = order.number
      await this.addItem(item)
    }

    return order.number
  }

  async addItem(item: InpuCreateOrderItemDto) {
    await db.query(
      `insert into ordersitems (id, numberorder, productid, productdescription, quantity, productprice, active, created_at )
        values ($1, $2, $3, $4, $5, $6,$7,$8)`,
      [
        item.id,
        item.numberOrder,
        item.productId,
        item.productDescription,
        item.quantity,
        item.productPrice,
        item.active,
        item.createdAt,
      ],
    )
  }

  async numberOrder(): Promise<number | null> {
    const retorno = await db.oneOrNone(`select coalesce(max( number),999) + 1 number from orders`)
    return retorno.number
  }
}
