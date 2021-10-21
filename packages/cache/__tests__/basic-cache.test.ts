import { BasicCache } from '../lib'
import avaTest, { TestInterface } from 'ava'

const test = avaTest as TestInterface<{ cache: BasicCache }>

test.before((t) => {
	t.context.cache = new BasicCache(6379)
})

test('CACHE | storing keys...', async ({ context, notThrowsAsync }) => {
	await notThrowsAsync(context.cache.store<string>('test-key', 'test-value'))
	await notThrowsAsync(context.cache.store<CacheTestMockData>('zexal-yuma', {
		name: 'yuma',
		age: '14',
		desc: 'annoying ass duelist basically through-out the whole anime.'
	}))
})

test('CACHE | fetching keys...', async ({ context, notThrowsAsync }) => {
	await notThrowsAsync(context.cache.fetch('test-key'))
})

test('CACHE | ...delete after store', async ({ context, throwsAsync, notThrowsAsync }) => {
	await context.cache.storeDeleteAfter('zexal-tori', 'she existed!', 5000)

	await notThrowsAsync(context.cache.fetch('zexal-tori'))

	setTimeout(async () => {
		await throwsAsync(context.cache.fetch('zexal-tori'))
	}, 5000)
})

interface CacheTestMockData {
	age: string
	name: string
	desc: string
}