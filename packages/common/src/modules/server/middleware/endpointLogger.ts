import {
  Request,
  Response,
  NextFunction
} from 'express'

import {
  logger
} from '../../logger'

export const endpointLogger = (
  req: Request,
  res: Response,
  n: NextFunction,
): void => {
  logger.info(`${req.method.toUpperCase()} -> "${req.path}" | Code: ${res.status}`)

  n()
}
