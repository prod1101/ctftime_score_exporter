import { expect } from '@jest/globals'
import { run } from '../src/main'
import { setupActionDefaultEnvironmentVariables } from '../src/misc'

describe('main.ts', () => {
  beforeEach(() => {
    setupActionDefaultEnvironmentVariables()
  })

  it('Test normal execution', async () => {
    await run()
    expect(true).toBe(true)
  })
})
