import {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express'

export const asyncWrap = (action: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await action(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
