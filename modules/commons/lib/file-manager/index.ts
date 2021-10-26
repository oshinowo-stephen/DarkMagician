import fs from 'fs/promises'
import { FileError } from './utils'
import path from 'path'

export class FileManager {

	private readonly files: File[] = []

	async create (path: string, contents?: string): Promise<void> {
		try {
			await fs.writeFile(path, contents || '')

			this.files.push(parsePathToFile(path))
		} catch (error) {
			throw new FileError(`Unable to write to current path: ${path}`)
		}
	}

	async readFile (file: string): Promise<string> {
		try {
			let incomingContents = ''
			const contents = await fs.readFile(file)
			incomingContents += contents

			return incomingContents
		} catch (error) {
			console.log(error)

			throw new FileError('Unable to read current file.')
		}
	}

}

const parsePathToFile = (incomingPath: string): File => {
	return {
		location: incomingPath,
		dirName: path.dirname(incomingPath),
		name: path.basename(incomingPath),
		ext: path.extname(incomingPath),
	}
}

export interface File {
	ext: string
	name: string
	dirName: string
	location: string
}
