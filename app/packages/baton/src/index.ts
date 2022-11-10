export { get, CardRequest } from './cards'

export interface BatonRequest<T> {
    service: 'cards' | 'decks',
    requestBody: T
}