export class FileError extends Error {
	constructor (message?: string) {
		super()

		this.name = 'File Error'
		this.message = message
		|| 'An unhandled error has occurred.'
	}
}