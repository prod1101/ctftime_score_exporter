// https://stackoverflow.com/a/8273091
export function range(start: number, stop: number, step = 1): number[] {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start
    start = 0
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return []
  }

  const result = []
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i)
  }

  return result
}

export function styleByRanking(placement: number, teams: number): string {
  const percentile_rank = 100.0 - (100.0 / teams) * (placement - 1.0)
  if (percentile_rank === 100) return 'style="color:#e5cc80"'
  if (percentile_rank >= 99) return 'style="color:#e268a8"'
  if (percentile_rank >= 95) return 'style="color:#ff8000"'
  if (percentile_rank >= 75) return 'style="color:#a335ee"'
  if (percentile_rank >= 50) return 'style="color:#0070ff"'
  if (percentile_rank >= 25) return 'style="color:#1eff00"'
  return ''
}
