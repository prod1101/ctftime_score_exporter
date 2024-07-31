import { expect } from '@jest/globals'
import { range } from '../src/utils'

describe('utils.ts', () => {
  it('Test Array creation of range function without step', async () => {
    const some_range = range(7, 13)
    expect(some_range).toEqual([7, 8, 9, 10, 11, 12])
  })

  it('Test Array creation of range function with step', async () => {
    const some_range = range(13, 45, 9)
    expect(some_range).toEqual([13, 22, 31, 40])
  })

  it('Test Array creation of range function with negative step', async () => {
    const some_range = range(45, 13, -9)
    expect(some_range).toEqual([45, 36, 27, 18])
  })

  it('Test Array creation of range function with negative step and negative stop', async () => {
    const some_range = range(13, -9, -9)
    expect(some_range).toEqual([13, 4, -5])
  })

  it('Test Array creation of range function with negative start', async () => {
    const some_range = range(-9, 13, 9)
    expect(some_range).toEqual([-9, 0, 9])
  })

  it('Start is greater than stop', async () => {
    const some_range = range(13, 7)
    expect(some_range).toEqual([])
  })
})
