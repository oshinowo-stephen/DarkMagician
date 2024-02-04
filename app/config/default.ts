import { resolve } from 'path'
process.env['NODE_CONFIG_DIR'] = resolve(process.cwd(), '../config')
import { load } from 'docker-secret-env'
import { config } from 'dotenv'

const { NODE_ENV } = process.env

if (!NODE_ENV || NODE_ENV !== 'prod') {
    const envPath = resolve(process.cwd(), '../../.env')

    config({
        path: envPath 
    })
} else {
    load()
}

export default {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV ?? 'dev'
}