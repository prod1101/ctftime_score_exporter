// https://stackoverflow.com/a/8273091
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
