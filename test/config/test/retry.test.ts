import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { runVitest } from '../../test-utils'

const root = path.resolve('./fixtures/retry')
function run(testNamePattern?: string) {
  return runVitest({
    root,
    testNamePattern,
  })
}

describe('retry', () => {
  test('should passed', async () => {
    const { stdout } = await run('should passed')
    expect(stdout).toContain('1 passed')
  })

  test('retry but still failed', async () => {
    const { stdout } = await run('retry but still failed')
    expect(stdout).toContain('expected 1 to be 4')
    expect(stdout).toContain('expected 2 to be 4')
    expect(stdout).toContain('expected 3 to be 4')
    expect(stdout).toContain('1 failed')
  })
})
