import { config as dotenv } from 'dotenv'

dotenv()

export default {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV ?? 'development'
}