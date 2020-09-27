import test from 'ava'
import sinon from 'sinon'

import { logger } from '../src/index'

test('is working', (t) => {
  const stdoutStub = sinon.stub(process.stdout, 'write')

  logger.info('Hello, World!')
  logger.warn('Hello, World!')
  logger.error('Hello, World!')

  t.true(stdoutStub.calledThrice)
})
