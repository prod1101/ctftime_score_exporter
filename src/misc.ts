export function setupActionDefaultEnvironmentVariables(): void {
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
