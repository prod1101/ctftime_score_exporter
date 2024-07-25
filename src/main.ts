import * as core from '@actions/core'
import {
  fetchCompetitionsFromYear,
  fetchTeamByTeamId,
  filterCompetitionsByTeamId
} from './ctf-time-api'
import {
  calculatePercentileRanking,
  printPercentileMarkdownTable,
  range,
  styleByRanking
} from './utils'
import * as fs from 'fs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const team_id = parseInt(core.getInput('team_id'), 10)
    const team_data = await fetchTeamByTeamId(team_id)
    const interesting_years = range(2011, new Date().getFullYear() + 1)
      .filter(
        year => team_data.rating[year.toString()].rating_points !== undefined
      )
      .reverse()

    const percentile_colors =
      core.getInput('percentile_colors').toLowerCase() === 'true'
    let out = ''

    for (const year of interesting_years) {
      out += `\n### ${year}\n`
      out += `(Overall rating place: #${team_data.rating[year].rating_place}, Austria: #${team_data.rating[year].country_place})\n`
      out += `  <!-- place ${team_data.rating[year].rating_place} (${team_data.rating[year].rating_points}) -->\n`

      const competitions = await fetchCompetitionsFromYear(year)
      const filtered_competitions = filterCompetitionsByTeamId(
        competitions,
        team_id
      )

      for (const competition of filtered_competitions) {
        const place = competition.scores.find(
          score => score.team_id === team_id
        )
        if (place !== undefined) {
          const percentile_rank = calculatePercentileRanking(
            place.place,
            competition.scores.length
          )
          out += `  * ${competition.title} <span ${percentile_colors ? styleByRanking(percentile_rank) : ''} class="discreet">(place ${place.place} of ${competition.scores.length})</span>\n`
        }
      }
    }

    const output = `${core.getInput('prefix')}\n${printPercentileMarkdownTable()}${out}${core.getInput('suffix')}`

    fs.writeFileSync(core.getInput('outfile_path'), output)

    core.exportVariable('scores', output)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
