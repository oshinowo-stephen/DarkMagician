import {
  ParamsDictionary as ExpressParams,
} from 'express-serve-static-core'

export type Param<T = Record<string, unknown>> = ExpressParams & T
