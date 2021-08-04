import {
	createClient,
	RedisClient
} from 'redis'

import { logger } from '@magician/core'

const parsePort = (): number => process.env.REDIS_PORT !== undefined
	? !isNaN(parseInt(process.env.REDIS_PORT))
		? parseInt(process.env.REDIS_PORT)
		: 6379
	: 6379

export const client: RedisClient = createClient({
	port: parsePort(),
	db: process.env.REDIS_DATBASE ?? 'magician_cache'
})

export async function store<V>(key: string, v: V): Promise<void> {
	return new Promise((resolve, reject) => {
		client.set(key, JSON.stringify(v), (error, reply) => {
			if (error && reply !== 'OK') {
				reject(error)
			} else {
				resolve()
			}
		})
	})
}

export async function fetch<V>(key: string): Promise<V> {
	return new Promise((resolve, reject) => {
		client.get(key, (err, reply) => {
			if (err && !reply) {
				reject(err)
			} else {
				const stringedReply = reply as string
				resolve(JSON.parse(stringedReply) as V)
			}
		})
	})
}

client.on('error', (error) => {
	logger.error('An error occurred on "@magician/cache": ', error)
})

client.on('message', (ch, msg) => {
	logger.info(`Message was logged on "@magician/cache", ch: ${ch} | msg: ${msg}`)
})