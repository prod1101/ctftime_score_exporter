// https://stackoverflow.com/a/8273091
import * as core from '@actions/core'

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

export const percentiles: { [key: string]: number } = {
  '100': 0,
  '99': 0,
  '95': 0,
  '75': 0,
  '50': 0,
  '25': 0
}

export function printPercentileMarkdownTable(): string {
  let ret = ''
  if (core.getInput('percentile_rankings').toLowerCase() === 'true') {
    ret += '| Percentile: | Count |\n'
    ret += '|-------------|-------|\n'
    ret += `| <span ${styleByRanking(100)}>100th</span> | ${percentiles['100']} |\n`
    ret += `| <span ${styleByRanking(99)}>>99th</span> | ${percentiles['99']} |\n`
    ret += `| <span ${styleByRanking(95)}>>95th</span> | ${percentiles['95']} |\n`
    ret += `| <span ${styleByRanking(75)}>>75th</span> | ${percentiles['75']} |\n`
    ret += `| <span ${styleByRanking(50)}>>50th</span> | ${percentiles['50']} |\n`
    ret += `| <span ${styleByRanking(25)}>>25th</span> | ${percentiles['25']} |\n`
  }
  return ret
}

export function printPercentiles(): string {
  let ret = ''
  for (const percentile in percentiles) {
    ret += `<span ${styleByRanking(parseInt(percentile))}>${percentile}th</span> percentile: ${percentiles[percentile]}\n`
  }
  return ret
}

function insert_percentile(percentile: number): void {
  if (percentile === 100) {
    percentiles['100']++
  } else if (percentile >= 99) {
    percentiles['99']++
  } else if (percentile >= 95) {
    percentiles['95']++
  } else if (percentile >= 75) {
    percentiles['75']++
  } else if (percentile >= 50) {
    percentiles['50']++
  } else if (percentile >= 25) {
    percentiles['25']++
  }
}

export function calculatePercentileRanking(
  placement: number,
  teams: number
): number {
  const percentile_rank = 100.0 - (100.0 / teams) * (placement - 1.0)
  if (core.getInput('percentile_rankings').toLowerCase() === 'true') {
    insert_percentile(percentile_rank)
  }
  return percentile_rank
}

export function styleByRanking(percentile_rank: number): string {
  if (percentile_rank === 100) return 'style="color:#e5cc80"'
  if (percentile_rank >= 99) return 'style="color:#e268a8"'
  if (percentile_rank >= 95) return 'style="color:#ff8000"'
  if (percentile_rank >= 75) return 'style="color:#a335ee"'
  if (percentile_rank >= 50) return 'style="color:#0070ff"'
  if (percentile_rank >= 25) return 'style="color:#1eff00"'
  return ''
}
