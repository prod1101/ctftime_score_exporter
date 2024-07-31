import { expect } from '@jest/globals'
import { setupActionDefaultEnvironmentVariables } from '../src/misc'

describe('main.ts', () => {
  beforeEach(() => {
    setupActionDefaultEnvironmentVariables()
  })

  it('Test normal execution', async () => {
    expect(true).toBe(true)
  })
})
