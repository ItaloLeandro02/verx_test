import { Request, Response } from "express";
import { Controller, HttpRequest } from "@/presentation/protocols"

export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params
        }
        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(
          httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299
            ? httpResponse.body
            : { error: httpResponse.body.message }
        )
      }
}