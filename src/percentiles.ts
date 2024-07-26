import * as core from '@actions/core'

export const percentiles: { [key: string]: number } = {
  '100': 0,
  '99': 0,
  '95': 0,
  '75': 0,
  '50': 0,
  '25': 0
}

export function printPercentileMarkdownTable(): string {
  let ret = '| Percentile: | Count |\n'
  ret += '|---|---|\n'
  ret += `| <span ${styleByRanking(100)}>100th</span> | ${percentiles['100']} |\n`
  ret += `| <span ${styleByRanking(99)}>>99th</span> | ${percentiles['99']} |\n`
  ret += `| <span ${styleByRanking(95)}>>95th</span> | ${percentiles['95']} |\n`
  ret += `| <span ${styleByRanking(75)}>>75th</span> | ${percentiles['75']} |\n`
  ret += `| <span ${styleByRanking(50)}>>50th</span> | ${percentiles['50']} |\n`
  ret += `| <span ${styleByRanking(25)}>>25th</span> | ${percentiles['25']} |\n`
  return ret
}

export function printPercentileMarkdownTableInverse(): string {
  let line1 = '| Percentile: | '
  let line2 = '|---| '
  let line3 = '| Count: | '
  for (const percentile in percentiles) {
    line1 += `<span ${styleByRanking(parseInt(percentile))}>>${percentile}th</span> | `
    line2 += '--- | '
    line3 += `${percentiles[percentile]} | `
  }
  return `${line1}\n${line2}\n${line3}`
}

export function printPercentiles(): string {
  switch (core.getInput('percentile_rankings').toLowerCase()) {
    case 'true':
      return printPercentileMarkdownTable()
    case 'transpose':
      return printPercentileMarkdownTableInverse()
    default:
      return ''
  }
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
  insert_percentile(percentile_rank)
  return percentile_rank
}

function validateColorString(s: string): string {
  if (!s.match(/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i)) {
    throw new Error(`Invalid color string: ${s}`)
  }
  return s
}

export function styleByRanking(percentile_rank: number): string {
  if (percentile_rank === 100)
    return `style="color:${validateColorString(core.getInput('percentile_color_100'))}"`
  if (percentile_rank >= 99)
    return `style="color:${validateColorString(core.getInput('percentile_color_99'))}"`
  if (percentile_rank >= 95)
    return `style="color:${validateColorString(core.getInput('percentile_color_95'))}"`
  if (percentile_rank >= 75)
    return `style="color:${validateColorString(core.getInput('percentile_color_75'))}"`
  if (percentile_rank >= 50)
    return `style="color:${validateColorString(core.getInput('percentile_color_50'))}"`
  if (percentile_rank >= 25)
    return `style="color:${validateColorString(core.getInput('percentile_color_25'))}"`
  return ''
}
