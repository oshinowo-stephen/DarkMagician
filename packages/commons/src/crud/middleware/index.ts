import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'

import { log as logger } from '../../logger'
import responseTime from 'response-time'

export { errorMiddleware } from './error'

export const loggerEndpoint = (
  req: Request,
  res: Response,
  n: NextFunction,
): void => {
  res.app.use(responseTime())

  let time = ''
  const respTime = res.getHeader('X-Response-Time')

  if (respTime !== undefined) {
    time = `| CODE: ${respTime.toString()}`
  }

  logger.info(format(req, res, time.toString()))

  return n()
}

export const asyncWrap = (a: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    n: NextFunction,
  ): Promise<void> => {
    try {
      await a(req, res, n)
    } catch (e) {
      n(e)
    }
  }
}

const format = (
  req: Request,
  res: Response,
  time: string,
): string => `
[${req.method}] -> "${req.path}" <=> ${res.statusCode} ${time}`
