import test from 'ava'
import sinon from 'sinon'
import { fetch } from '../lib'
import { cache } from '../lib/utils'
import * as request from '../lib/rest'

test('fetch [ black rose dragon ] from org', async ({ truthy }) => {
	const requestSpy = sinon.spy(request, 'forgeRequest')
	await fetch('black rose dragon')

	truthy(requestSpy.calledWithExactly('black rose dragon', undefined))
})

test('fetch [ black rose dragon ] from cache', async ({ truthy }) => {
	const cacheSpy = sinon.spy(cache, 'fetch')
	await fetch('black rose dragon')

	truthy(cacheSpy.calledWithExactly('black rose dragon'))
})

test('invalid card', async ({ throwsAsync }) => {
	await throwsAsync(fetch('some random ass card...'))
})