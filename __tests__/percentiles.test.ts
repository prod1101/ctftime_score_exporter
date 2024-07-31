import { expect } from '@jest/globals'
import { printPercentiles } from '../src/percentiles'

function setupDefaultEnvironment(): void {
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
}

beforeEach(() => {
  setupDefaultEnvironment()
})

describe('percentiles.test.ts', () => {
  it('Test printPercentile for top_transpose', async () => {
    process.env['INPUT_PERCENTILE_RANKINGS'] = 'top_transpose'
    const table = printPercentiles()
    console.log(table)
    expect(table).toBe(
      '| Top % > | <span style="color:#1eff00">Top75%</span> | <span style="color:#0070ff">Top50%</span> | <span style="color:#a335ee">Top25%</span> | <span style="color:#ff8000">Top5%</span> | <span style="color:#e268a8">Top1%</span> | <span style="color:#e5cc80">Winner</span> |\n' +
        '| ---: | :---: | :---: | :---: | :---: | :---: | :---: |\n' +
        '| Count > | 0 | 0 | 0 | 0 | 0 | 0 |\n'
    )
  })
})
