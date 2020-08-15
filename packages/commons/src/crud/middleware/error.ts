import {
  NOT_FOUND,
  FORBIDDEN,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from 'http-status-codes'

import {
  Request,
  Response,
} from 'express'

import { log as logger } from '../../logger'
import { InputValidationError } from 'openapi-validator-middleware'

class ErrorResponse {

  public readonly code: number
  public readonly message: string

  constructor (code: number, message: string) {
    this.code = code
    this.message = message
  }

}

class ServerError extends ErrorResponse {

  constructor (message?: string) {
    super(INTERNAL_SERVER_ERROR, message ?? 'Issues forming this request')
  }

}

class BadRequestError extends ErrorResponse {

  constructor (message?: string) {
    super(BAD_REQUEST, message ?? 'Bad Request')
  }

}

class ForbiddenError extends ErrorResponse {

  constructor (message?: string) {
    super(FORBIDDEN, message ?? 'Forbidden')
  }

}

class NotFoundError extends ErrorResponse {

  constructor (message?: string) {
    super(NOT_FOUND, message ?? 'Not Found')
  }

}

export const errorMiddleware = (
  error: Error | ErrorResponse,
  _req: Request,
  res: Response,
): Response => {
  switch (error.constructor) {
    case BadRequestError:
    case ForbiddenError:
    case NotFoundError:
    case ServerError:
      logger.warn(`${error.constructor.name} - ${error.message}`)
      return res
        .status((<ErrorResponse>error).code)
        .json(error)
    case InputValidationError:
      logger.warn(`Validation Error: ${error.message}`)
      return res
        .status((<ErrorResponse>error).code)
        .json({
          message: error.message,
          errors: (<InputValidationError>error).errors,
        })
    default:
      logger.error(`UNHANDLED ERROR: ${(<Error>error).stack ?? ''}`)
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Error' })
  }
}
