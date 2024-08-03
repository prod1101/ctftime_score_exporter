/**
 * Reference: https://stackoverflow.com/a/8273091
 * Generates an array of numbers in a specified range.
 *
 * This function creates an array of numbers starting from `start` up to, but not including, `stop`,
 * incrementing by `step`. If the `step` is positive and `start` is greater than or equal to `stop`,
 * or if the `step` is negative and `start` is less than or equal to `stop`, an empty array is returned.
 *
 * @param {number} start - The starting number of the range.
 * @param {number} stop - The ending number of the range (exclusive).
 * @param {number} [step=1] - The increment (or decrement) step between numbers in the range.
 * @returns {number[]} An array of numbers in the specified range.
 */
export function range(start: number, stop: number, step = 1): number[] {
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return []
  }

  const result = []
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i)
  }

  return result
}
