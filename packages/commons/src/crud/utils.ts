import {
  ParamsDictionary as ExpressParams,
} from 'express-serve-static-core'

export type Params<T = Record<string, unknown>> = ExpressParams & T
