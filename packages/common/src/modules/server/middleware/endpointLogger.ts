import {
  Request,
  Response,
  NextFunction,
} from 'express'

import {
  logger,
} from '../../logger'

export const endpointLogger = (
  req: Request,
  res: Response,
  n: NextFunction,
): void => {
  const method = req.method.toUpperCase()
  const code = res.statusCode
  const path = req.path

  const content = `${method} -> "${path}" | Code: ${code}`

  logger.log('info', content)

  n()
}
