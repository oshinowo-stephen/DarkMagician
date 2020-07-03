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
  const content = `
${req.method.toUpperCase()} -> "${req.path}" | Code: ${res.statusCode}
`.replace(/\s/g, '')

  logger.log('info', content)

  n()
}
