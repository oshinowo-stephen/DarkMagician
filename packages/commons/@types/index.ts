declare module '@dmg/commons' {
	import { Logger } from 'winston'

	export namespace logger {

		export const logger: () => Logger

	}
}