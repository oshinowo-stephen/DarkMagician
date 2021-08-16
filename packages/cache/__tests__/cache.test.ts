import test from 'ava'
import * as cache from '../src'

test('STORE - SIMPLE MESSAGE', async (t) => {
	cache.client.del('simple-message')

	await cache.store('simple-message', 'hello world')

	t.is(await cache.fetch('simple-message'), 'hello world')
})

test('STORE - COMPLEX OBJECT', async (t) => {
	cache.client.del('complex-object')

	await cache.store('complex-object', {
		anime: 'girl'
	})

	t.deepEqual(await cache.fetch('complex-object'), {
		anime: 'girl'
	})
})