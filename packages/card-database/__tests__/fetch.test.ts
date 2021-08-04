import sinon from 'sinon'
import cache from '@magician/cache'
import avaTest, { TestInterface } from 'ava'
import database, { CardOptions } from '@magician/card-database'

const test = avaTest as TestInterface<{ name: string }>

test.before((t) => {
	t.context.name = 'black rose draon'

	cache.client.del(t.context.name)
})

test('fetching [ from HTTP ]', async (t) => {
	const calledCacheFetch = sinon.spy(cache, 'fetch')
	const calledCacheStore = sinon.spy(cache, 'store')
	const calledHttpFetch = sinon.spy(database, 'http')

	const response = await database.fetch(t.context.name, {} as CardOptions)

	t.is(response.name, 'Black Rose Dragon')
	t.true(calledCacheFetch.exceptions.length !== 0)
	t.true(calledCacheFetch.calledOnceWithExactly(t.context.name))
	t.true(calledCacheStore.calledOnceWithExactly(t.context.name, JSON.stringify(response)))
	t.true(calledHttpFetch.calledOnceWithExactly(t.context.name, {} as CardOptions))
})

test('fetching [ from CACHE ]', async (t) => {
	const calledCacheFetch = sinon.spy(cache, 'fetch')
	const calledCacheStore = sinon.spy(cache, 'store')
	const calledHttpFetch = sinon.spy(database, 'http')

	const response = await database.fetch(t.context.name, {} as CardOptions)

	t.true(calledHttpFetch.callCount === 0)
	t.true(calledCacheStore.callCount === 0)
	t.is(response.name, 'Black Rose Dragon')
	t.true(calledCacheFetch.calledOnceWithExactly(t.context.name))
})
