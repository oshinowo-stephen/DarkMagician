import Redis from 'ioredis'

interface CacheTimers {
	keyToDelete: string
	deleteIn: number
}

export class BasicCache {

	private client!: Redis.Redis
	private readonly cacheTick = 500

	private timers: CacheTimers[] = []

	constructor (port: number) {
		this.client = new Redis(port)

		setInterval(() => {
			if (this.timers.length !== 0) {
				this.timers.forEach((timer) => {
					if (timer.deleteIn < Date.now()) {
						this.client.del(timer.keyToDelete)
							.catch((error) => {
								throw new Error(`Having trouble deleting one of the time keys: ${error}`)
							})
					}
				})
			}
		}, this.cacheTick)
	}

	async fetch<C>(k: string): Promise<C> {
		const incomingVal = await this.client.get(k)

		if (!incomingVal) {
			throw new Error(`Key: ${k} not found.`)
		}

		return JSON.parse(incomingVal) as unknown as C
	}

	async store<C>(k: string, val: C): Promise<void> {
		const insertingValue = JSON.stringify(val)

		try {
			await this.client.set(k, insertingValue)
		} catch (error) {
			throw new Error(`Error inserting into cache, reason: ${error}`)
		}
	}

	async update<C>(k: string, nval: C): Promise<void> {
		const currentValue = await this.fetch(k)

		if (currentValue !== nval) {
			try {
				await this.store(k, nval)
			} catch (error) {
				throw new Error(``)
			}
		}

		throw new Error(``)
	}

	async storeDeleteAfter<C>(k: string, val: C, after: number): Promise<void> {
		try {
			await this.store(k, val)
		} catch (error) {
			throw new Error(`Unable to store this key: ${error}`)
		}

		this.timers.push({ keyToDelete: k, deleteIn: after + Date.now() })
	}

	async remove(k: string): Promise<void> {
		try {
			await this.client.del(k)

			const keys = this.timers.filter((v) => v.keyToDelete === k)
			const index = this.timers.indexOf(keys[0])
			this.timers.splice(index, 1)
		} catch (error) {
			throw new Error(`Unable to remove this key: ${error}`)
		}
	}

}

