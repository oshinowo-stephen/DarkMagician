export class CacheError extends Error {}

export class StoreError extends CacheError {}

export class FetchError extends CacheError {}

export class UpdateError extends CacheError {}

export class RemoveError extends CacheError {}