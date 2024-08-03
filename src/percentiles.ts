import * as core from '@actions/core'

/**
 * An object representing the count of competitions in different percentile
 * ranks of the team.
 */
const percentiles: { [key: string]: number } = {
  '100': 0,
  '99': 0,
  '95': 0,
  '75': 0,
  '50': 0,
  '25': 0
}

/**
 * Generates the percentile rankings based on the input configuration.
 *
 * @returns A string representing the formatted percentile rankings.
 */
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

/**
 * Calculates the percentile ranking for a given placement and number of teams.
 *
 * @param placement - The placement of the team.
 * @param teams - The total number of teams.
 * @returns The calculated percentile ranking.
 */
export function calculatePercentileRanking(
  placement: number,
  teams: number
): number {
  const percentile_rank = 100.0 - (100.0 / teams) * (placement - 1.0)
  insert_percentile(percentile_rank)
  return percentile_rank
}

/**
 * Styles the ranking based on the percentile rank.
 *
 * @param percentile_rank - The percentile rank to style.
 * @returns A string representing the style attribute for the given percentile rank.
 */
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

/**
 * Prints the percentile rankings in a table format.
 *
 * @returns A string representing the formatted percentile rankings table.
 */
function printPercentile(): string {
  let ret = '| PCTL : | Count |\n'
  ret += '|---:|---:|\n'
  const keys = Object.keys(percentiles).reverse()
  for (const key of keys) {
    ret += `| <span ${styleByRanking(parseInt(key))}>${key}th</span>: | ${percentiles[key]} |\n`
  }
  return ret
}

/**
 * Prints the top percentile rankings in a table format.
 *
 * @returns A string representing the formatted top percentile rankings table.
 */
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

/**
 * Prints the percentile rankings in a transposed table format.
 *
 * @returns A string representing the formatted transposed percentile rankings table.
 */
function printPercentileTranspose(): string {
  let line1 = '| PCTL > |'
  let line2 = '| ---: |'
  let line3 = '| Count > |'
  for (const percentile in percentiles) {
    line1 += ` <span ${styleByRanking(parseInt(percentile))}>${percentile}th</span> |`
    line2 += ' :---: |'
    line3 += ` ${percentiles[percentile]} |`
  }
  return `${line1}\n${line2}\n${line3}\n`
}

/**
 * Prints the top percentile rankings in a transposed table format.
 *
 * @returns A string representing the formatted transposed top percentile rankings table.
 */
function printTopPercentTranspose(): string {
  let line1 = '| Top % > |'
  let line2 = '| ---: |'
  let line3 = '| Count > |'
  for (const percentile in percentiles) {
    if (parseInt(percentile) === 100) {
      line1 += ` <span ${styleByRanking(parseInt(percentile))}>Winner</span> |`
    } else {
      line1 += ` <span ${styleByRanking(parseInt(percentile))}>Top ${100 - parseInt(percentile)}%</span> |`
    }
    line2 += ' :---: |'
    line3 += ` ${percentiles[percentile]} |`
  }
  return `${line1}\n${line2}\n${line3}\n`
}

/**
 * Inserts the percentile rank into the percentiles object.
 *
 * @param percentile - The percentile rank to insert.
 */
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

/**
 * Validates if the given string is a valid hex color code.
 *
 * @param s - The string to validate.
 * @returns The validated color string.
 * @throws Error Will throw an error if the string is not a valid hex color code.
 */
function validateColorString(s: string): string {
  if (!s.match(/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i)) {
    throw new Error(
      `Invalid color string: "${s}". Did you use a valid hex color code? Don't forget to use '' around the color code! Otherwise, it will be interpreted as a comment. Correct Example: '#FF0000'`
    )
  }
  return s
}
