import test from 'ava'
import { forgeRequest } from '../lib'

test('request card', async (t) => {
	const response = await forgeRequest('black rose dragon')

	t.is(response[0].name, 'Black Rose Dragon')
})

test('request card - invalid card', async (t) => {
	await t.throwsAsync(forgeRequest('dadadadadadan'))
})