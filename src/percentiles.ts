import * as core from '@actions/core'

const percentiles: { [key: string]: number } = {
  '100': 0,
  '99': 0,
  '95': 0,
  '75': 0,
  '50': 0,
  '25': 0
}

export function printPercentiles(): string {
  switch (core.getInput('percentile_rankings').toLowerCase()) {
    case 'true':
      return printPercentile()
    case 'transpose':
      return printPercentileTranspose()
    case 'top':
      return printTopPercent()
    case 'top_transpose':
      return printTopPercentTranspose()
    default:
      return ''
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

/// Private functions
function printPercentile(): string {
  let ret = '| PCTL : | Count |\n'
  ret += '|---:|---:|\n'
  const keys = Object.keys(percentiles).reverse()
  for (const key of keys) {
    ret += `| <span ${styleByRanking(parseInt(key))}>${key}th</span>: | ${percentiles[key]} |\n`
  }
  return ret
}

function printTopPercent(): string {
  let ret = '| Top % : | Count |\n'
  ret += '|---:|---:|\n'
  const keys = Object.keys(percentiles).reverse()
  for (const key of keys) {
    if (parseInt(key) === 100) {
      ret += `| <span ${styleByRanking(parseInt(key))}>Winner</span>: | ${percentiles[key]} |\n`
    } else {
      ret += `| <span ${styleByRanking(parseInt(key))}>Top${100 - parseInt(key)}%</span>: | ${percentiles[key]} |\n`
    }
  }
  return ret
}

function printPercentileTranspose(): string {
  let line1 = '| Percentile > | '
  let line2 = '| ---: | '
  let line3 = '| Count > | '
  for (const percentile in percentiles) {
    line1 += `<span ${styleByRanking(parseInt(percentile))}>${percentile}th</span> | `
    line2 += ':---: | '
    line3 += `${percentiles[percentile]} | `
  }
  return `${line1}\n${line2}\n${line3}\n`
}

function printTopPercentTranspose(): string {
  let line1 = '| Top % > | '
  let line2 = '| ---: | '
  let line3 = '| Count > | '
  for (const percentile in percentiles) {
    if (parseInt(percentile) === 100) {
      line1 += `<span ${styleByRanking(parseInt(percentile))}>Winner</span> | `
    } else {
      line1 += `<span ${styleByRanking(parseInt(percentile))}>Top${100 - parseInt(percentile)}%</span> | `
    }
    line2 += ':---: | '
    line3 += `${percentiles[percentile]} |`
  }
  return `${line1}\n${line2}\n${line3}\n`
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

function validateColorString(s: string): string {
  if (!s.match(/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i)) {
    throw new Error(
      `Invalid color string: "${s}". Did you use a valid hex color code? Don't forget to use '' around the color code! Otherwise, it will be interpreted as a comment. Correct Example: '#FF0000'`
    )
  }
  return s
}
