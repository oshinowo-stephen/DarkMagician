import {
  Get,
  Controller,
} from '@overnightjs/core'

import {
  Request,
  Response,
} from 'express'

import moment from 'moment'

interface ProcessResult {
  system: string
  uptime: string
  memUsage: number
}

@Controller('debug')
export class Debug {

  @Get('process')
  public pInfo (
    _req: Request,
    res: Response<ProcessResult>,
  ): typeof res {
    const memUsage = Math.round((process.memoryUsage()
      .heapUsed / 1024 / 1024 * 100) / 100)

    return res
      .status(200)
      .json({
        memUsage,
        system: process.platform,
        uptime: moment(process.uptime() * 1000)
          .format('mm:ss'),
      })
  }

}
