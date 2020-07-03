import {
  Request,
  Response,
} from 'express'

export interface CRUDController {
  fetch (req: Request, res: Response): Promise<typeof res>
  store (req: Request, res: Response): Promise<typeof res>
}
