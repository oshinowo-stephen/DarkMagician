export interface IncomingResponse {
	error?: string
	data: IncomingRawCardInfo[]
}

export interface IncomingRawCardInfo {
	name?: string
}