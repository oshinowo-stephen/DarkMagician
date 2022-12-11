import { get } from '.'

describe('fetching card - test suite', () => {
    test('fetch card', async () => {
        await expect(get({ name: 'dark magician girl', opts: undefined }))
            .resolves
            .toBeDefined()
    })

    test('fetch card of similar name', async () => {
        await expect(get({ name: 'toon dark magician girl', opts: undefined }))
            .resolves
            .toBeDefined()
    })

    test('fetch invalid card', async () => {
        await expect(get({ name: 'some-invalid-card-name-idk', opts: undefined }))
            .rejects
            .toBeTruthy()
    })
})
