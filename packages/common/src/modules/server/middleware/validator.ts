import * as validator from 'openapi-validator-middleware'
import { join } from 'path'

import {
  Request,
  Response,
  NextFunction,
} from 'express'

const swaggerPath = join(
  __dirname,
  '..', '..',
  '..', '..',
  '..', '..',
  '@api/docs.yml',
)

process.stdout.write(swaggerPath + '\n')

validator.init(swaggerPath, {
  framework: 'express',
})

export const apiValidator = (
  req: Request,
  _res: Response,
  n: NextFunction,
): void => validator.validate(req.body, n)
