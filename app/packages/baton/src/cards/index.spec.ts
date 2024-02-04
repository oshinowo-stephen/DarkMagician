import { get } from '.'

describe('fetching card - test suite', () => {
    test('fetch card', async () => {
        await expect(get({ card_name: 'dark magician girl', opts: undefined }))
            .resolves
            .toBeDefined()
    })

    test('fetch card of similar name', async () => {
        await expect(get({ card_name: 'toon dark magician girl', opts: undefined }))
            .resolves
            .toBeDefined()
    })

    test('fetch invalid card', async () => {
        await expect(get({ card_name: 'some-invalid-card-name-idk', opts: undefined }))
            .rejects
            .toBe('Invalid Card.')
    })
})
