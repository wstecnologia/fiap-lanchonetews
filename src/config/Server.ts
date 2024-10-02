import dotenv from "dotenv"
dotenv.config()

import express from "express"
import swaggerUi from "swagger-ui-express"
import { allRoutes } from "../adapters/routes/index"
import swaggerSpec from "./Swagger"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/api", allRoutes)

export default app
