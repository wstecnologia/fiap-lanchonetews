import { Router } from "express"

import CategoryRoutes from "./CategoriesRoute"
import CustomersRoutes from "./CustomersRoute"
import OrderRoutes from "./OrdersRoute"
import PaymentRoutes from "./PaymentRoutes"
import ProductRoutes from "./ProductsRoute"

const routes = Router()

new CustomersRoutes(routes)
new OrderRoutes(routes)
new CategoryRoutes(routes)
new ProductRoutes(routes)
new PaymentRoutes(routes)

export { routes as allRoutes }
