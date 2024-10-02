import { IResponseListDto } from "@/core/adapters/dtos/ResponseListDto"
import IProductRepository from "@/core/adapters/interfaces/IProductRepository"
import Product from "@/core/entities/Product"
import db from "../config/PostgreSql"

export default class ProductRepository implements IProductRepository {
  async registerProduct(product: Product): Promise<void> {
    await db.query(
      `INSERT INTO product (id, name, description, price, categoryid, image)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        product.id,
        product.name,
        product.description,
        product.price,
        product.categoryId,
        product.image,
      ],
    )
  }

  async countProducts(): Promise<number> {
    const result = await db.oneOrNone(`SELECT count(*) AS total FROM product WHERE active = true`)
    return result ? result.total : 0
  }

  async findById(productId: string): Promise<Product | null> {
    const query = "SELECT * FROM product WHERE id = $1 AND active = true"
    const result = await db.oneOrNone(query, [productId])
    return result ? Product.factory(result) : null
  }

  async findByCategory(
    categoryId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<IResponseListDto | null> {
    const OFFSET = limit * (page - 1)
    const products = await db.query(
      `SELECT COUNT(*) OVER() AS total, * FROM product WHERE active = true
        and categoryId = $1
         LIMIT $2 OFFSET $3`,
      [categoryId, limit, OFFSET],
    )

    return !products || products.length === 0
      ? {
          items: [],
          totalItems: 0,
        }
      : {
          items: products,
          totalItems: products[0].total,
        }
  }

  async listAll(page: number = 1, limit: number = 10): Promise<IResponseListDto | null> {
    const offset = limit * (page - 1)
    const products = await db.any(
      `SELECT  COUNT(*) OVER() AS total, *
         FROM product WHERE active = true LIMIT $1 OFFSET $2`,
      [limit, offset],
    )
    return !products || products.length === 0
      ? {
          items: [],
          totalItems: 0,
        }
      : {
          items: products,
          totalItems: products[0].total,
        }
  }

  async delete(productId: string): Promise<void> {
    const query = `UPDATE product SET active = false WHERE id = $1 AND active = true`
    await db.none(query, [productId])
  }

  async updateProduct(product: Product): Promise<void> {
    const query = `UPDATE product
                   SET name = $1,
                       description = $2,
                       price = $3,
                       categoryid = $4,
                       image = $5
                       active = $6
                   WHERE id = $7`
    await db.none(query, [
      product.name,
      product.description,
      product.price,
      product.categoryId,
      product.image,
      product.id,
      product.active,
    ])
  }
}
