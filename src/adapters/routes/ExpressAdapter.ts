import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import { Request, Response } from "express"

class ExpressAdapter {
  public static adaptRoute(handler: Function) {
    return async (req: Request, res: Response) => {
      try {
        const result = await handler({
          body: req.body,
          query: req.query,
          params: req.params,
        })
        res.status(200).json(result)
      } catch (error) {
        console.log(error.message)
        if (error instanceof AppErrors) {
          res.status(error.errorCode).json({ message: error.message })
        } else {
          res.status(500).json({ message: ErrosMessage.DEFAULT_MESSAGE })
        }
      }
    }
  }
}

export default ExpressAdapter
