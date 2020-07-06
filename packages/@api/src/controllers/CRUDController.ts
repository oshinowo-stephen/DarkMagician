import {
  Request,
  Response,
} from 'express'

export interface CRUDController {
  del (req: Request, res: Response): Promise<typeof res>
  read (req: Request, res: Response): Promise<typeof res>
  create (req: Request, res: Response): Promise<typeof res>
  update (req: Request, res: Response): Promise<typeof res>
}
