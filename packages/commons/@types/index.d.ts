
declare module '@magician/core' {
	import { Logger } from 'winston'

	export interface MagicianConfig {
		token?: string
		server_address?: string
		database_conn_string?: string
	}

	export const logger: Logger

	export const loadEnv: () => void

}