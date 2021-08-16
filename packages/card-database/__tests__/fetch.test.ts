import sinon from 'sinon'
import * as database from '../src'
import * as cache from '@magician/cache'
import avaTest, { TestInterface } from 'ava'

const test = avaTest as TestInterface<{
	name: string,
	fetch: sinon.SinonSpy,
	store: sinon.SinonSpy
}>

test.before((t) => {
	t.context.fetch = sinon.spy(cache, 'fetch')
	t.context.store = sinon.spy(cache, 'store')

	cache.client.del('black rose dragon')
})

test.afterEach((t) => {
	t.context.fetch.restore()
	t.context.store.restore()
})

test('fetching [ from HTTP ]', async (t) => {
	let response
	const { fetch, store } = t.context

	response = await database.retrieve('black rose dragon', {} as any)

	t.true(store.calledOnce)
	t.true(fetch.exceptions.length > 0)
	t.is(response.name, 'Black Rose Dragon')
})

test('fetching [ from CACHE ]', async (t) => {
	const { store, fetch } = t.context

	const response = await database.retrieve('black rose dragon', {} as any)

	t.true(fetch.calledOnce)
	t.true(store.exceptions.length > 0)
	t.is(response.name, 'Black Rose Dragon')
})
