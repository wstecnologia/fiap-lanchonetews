import { paymentPath } from "@/adapters/swagger/paymentPath"
import swaggerJsdoc from "swagger-jsdoc"
import { categoryPath } from "../adapters/swagger/categoryPaths"
import { customerPath } from "../adapters/swagger/customersPaths"
import { orderPaths } from "../adapters/swagger/orderPaths"
import { productPath } from "../adapters/swagger/productsPaths"

const combinetPaths = {
  ...customerPath,
  ...categoryPath,
  ...productPath,
  ...orderPaths,
  ...paymentPath,
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Techchalleger Api Lanchonete WS Documentation",
      version: "1.0.0",
    },

    paths: combinetPaths,
  },

  apis: [],
}

const swaggerSpec = swaggerJsdoc(options)
export default swaggerSpec
