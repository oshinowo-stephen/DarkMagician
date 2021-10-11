import test from 'ava'
import { join } from 'path'
import { FileManager } from '../lib'


test('file manager test - create', async (t) => {
	const manager = new FileManager()

	const fn = manager.create(join(__dirname, 'test-file.txt'), 'Hello, World!')

	await t.notThrowsAsync(fn)
})

test('file manager test - read', async (t) => {
	const manager = new FileManager()

	const contents = await manager.readFile(join(__dirname, 'test-file.txt'))

	t.is(contents, 'Hello, World!')
})