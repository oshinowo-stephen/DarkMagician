import fs from 'fs/promises'
import yaml from 'js-yaml'

import {
  logger,
} from '@darkmagician/common'

import generator, {
  SchemaId,
  DefaultTypeNameConvertor,
} from 'dtsgenerator'

const FILE_PATH = 'docs.yml'

const typeNameConvertor = (id: SchemaId): string[] => {
  const names = DefaultTypeNameConvertor(id)

  if (names.length > 0) {
    if (names[0] === 'Components') {
      names.shift()
    } else if (names[0] === 'Paths') {
      names[2] = names[2] + names[1]
    } else if (names[1] === 'Responses') {
      names.splice(1, 1)
    }
  }

  return names
}

const main = async (): Promise<void> => {
  const fileContents = await fs.readFile(FILE_PATH, 'utf-8')
  const yamlContents = yaml.safeLoad(fileContents)

  const result = await generator({
    contents: [ yamlContents ],
    typeNameConvertor,
    indentSize: 2,
  })

  const out = 'declare module \'@darkmagician/api\' {' +
    ('\n' + result)
      .replace(/;/gm, '')
      .replace(/declare\s/gm, '')
      .replace(/\n$/m, '')
      .replace(/\n/gm, '\n ') +
    '\n}\n'

  await fs.writeFile('index.d.ts', out)
}

main()
  .then(() => logger.log('info', 'index.d.ts generated'))
  .catch((error: Error) => logger
    .error(`error generating file, ${error.message}`))
