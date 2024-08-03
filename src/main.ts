import * as core from '@actions/core'
import * as fs from 'fs'
import { range } from './utils'
import {
  fetchCompetitionsFromYear,
  fetchTeamByTeamId,
  filterCompetitionsByTeamId
} from './ctf-time-api'
import {
  calculatePercentileRanking,
  printPercentiles,
  styleByRanking
} from './percentiles'
import countries from 'i18n-iso-countries'

/**
 * The main function for the action.
 *
 * This function fetches team data and competition results, processes the data to
 * calculate percentile rankings, and writes the results to an output file.
 *
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
    let comp_data = ''

    for (const year of interesting_years) {
      comp_data += `\n### ${year}\n`
      comp_data += `(Overall rating place: #${team_data.rating[year].rating_place}, ${countries.getName(team_data.country, 'en')}: #${team_data.rating[year].country_place})\n`
      comp_data += `  <!-- place ${team_data.rating[year].rating_place} (${team_data.rating[year].rating_points}) -->\n`

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
          comp_data += `  * ${competition.title} <span ${percentile_colors ? styleByRanking(percentile_rank) : ''} class="discreet">(place ${place.place} of ${competition.scores.length})</span>\n`
        }
      }
    }

    const output = `${core.getInput('prefix')}\n${printPercentiles()}${comp_data}${core.getInput('suffix')}`

    fs.writeFileSync(core.getInput('outfile_path'), output)

    core.exportVariable('scores', output)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
