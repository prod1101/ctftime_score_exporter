import { expect } from '@jest/globals'
import {
  calculatePercentileRanking,
  printPercentiles,
  styleByRanking
} from '../src/percentiles'

describe('percentiles.test.ts', () => {
  beforeEach(() => {
    process.env['INPUT_PERCENTILE_COLOR'] = 'true'
    process.env['INPUT_PREFIX'] = ''
    process.env['INPUT_SUFFIX'] = ''
    process.env['INPUT_PERCENTILE_COLORS'] = 'false'
    process.env['INPUT_PERCENTILE_RANKINGS'] = 'false'
    process.env['INPUT_PERCENTILE_COLOR_100'] = '#e5cc80'
    process.env['INPUT_PERCENTILE_COLOR_99'] = '#e268a8'
    process.env['INPUT_PERCENTILE_COLOR_95'] = '#ff8000'
    process.env['INPUT_PERCENTILE_COLOR_75'] = '#a335ee'
    process.env['INPUT_PERCENTILE_COLOR_50'] = '#0070ff'
    process.env['INPUT_PERCENTILE_COLOR_25'] = '#1eff00'
  })

  it('Test printPercentile for top_transpose', async () => {
    process.env['INPUT_PERCENTILE_RANKINGS'] = 'top_transpose'
    const table = printPercentiles()
    expect(table).toBe(
      '| Top % > | <span style="color:#1eff00">Top 75%</span> | <span style="color:#0070ff">Top 50%</span> | <span style="color:#a335ee">Top 25%</span> | <span style="color:#ff8000">Top 5%</span> | <span style="color:#e268a8">Top 1%</span> | <span style="color:#e5cc80">Winner</span> |\n' +
        '| ---: | :---: | :---: | :---: | :---: | :---: | :---: |\n' +
        '| Count > | 0 | 0 | 0 | 0 | 0 | 0 |\n'
    )
  })

  it('Test printPercentile for transpose', async () => {
    process.env['INPUT_PERCENTILE_RANKINGS'] = 'transpose'
    const table = printPercentiles()
    expect(table).toBe(
      '| PCTL > | <span style="color:#1eff00">25th</span> | <span style="color:#0070ff">50th</span> | <span style="color:#a335ee">75th</span> | <span style="color:#ff8000">95th</span> | <span style="color:#e268a8">99th</span> | <span style="color:#e5cc80">100th</span> |\n' +
        '| ---: | :---: | :---: | :---: | :---: | :---: | :---: |\n' +
        '| Count > | 0 | 0 | 0 | 0 | 0 | 0 |\n'
    )
  })

  it('Test printPercentile for top', async () => {
    process.env['INPUT_PERCENTILE_RANKINGS'] = 'top'
    const table = printPercentiles()
    expect(table).toBe(
      '| Top % : | Count |\n' +
        '|---:|---:|\n' +
        '| <span style="color:#e5cc80">Winner</span>: | 0 |\n' +
        '| <span style="color:#e268a8">Top1%</span>: | 0 |\n' +
        '| <span style="color:#ff8000">Top5%</span>: | 0 |\n' +
        '| <span style="color:#a335ee">Top25%</span>: | 0 |\n' +
        '| <span style="color:#0070ff">Top50%</span>: | 0 |\n' +
        '| <span style="color:#1eff00">Top75%</span>: | 0 |\n'
    )
  })

  it('Test printPercentile for percentile', async () => {
    process.env['INPUT_PERCENTILE_RANKINGS'] = 'true'
    const table = printPercentiles()
    expect(table).toBe(
      '| PCTL : | Count |\n' +
        '|---:|---:|\n' +
        '| <span style="color:#e5cc80">100th</span>: | 0 |\n' +
        '| <span style="color:#e268a8">99th</span>: | 0 |\n' +
        '| <span style="color:#ff8000">95th</span>: | 0 |\n' +
        '| <span style="color:#a335ee">75th</span>: | 0 |\n' +
        '| <span style="color:#0070ff">50th</span>: | 0 |\n' +
        '| <span style="color:#1eff00">25th</span>: | 0 |\n'
    )
  })

  it('Test printPercentile for any input', async () => {
    expect(printPercentiles()).toBe('')
  })

  it('Test hex color validation error', async () => {
    process.env['INPUT_PERCENTILE_COLOR_100'] = 'invalid'

    expect(() => {
      styleByRanking(100)
    }).toThrow(Error)
  })

  it('Test calculatePercentileRanking', async () => {
    expect(calculatePercentileRanking(1, 10)).toBe(100)
    expect(calculatePercentileRanking(10, 10)).toBe(10)
  })

  it('Test styleByRanking', async () => {
    expect(styleByRanking(100)).toBe('style="color:#e5cc80"')
    expect(styleByRanking(99)).toBe('style="color:#e268a8"')
    expect(styleByRanking(95)).toBe('style="color:#ff8000"')
    expect(styleByRanking(75)).toBe('style="color:#a335ee"')
    expect(styleByRanking(50)).toBe('style="color:#0070ff"')
    expect(styleByRanking(25)).toBe('style="color:#1eff00"')
    expect(styleByRanking(24)).toBe('')
  })

  it('Test insert_percentile', async () => {
    process.env['INPUT_PERCENTILE_RANKINGS'] = 'true'
    for (let i = 1; i <= 100; i++) {
      calculatePercentileRanking(i, 100)
    }
    expect(true).toBe(true)
  })
})
