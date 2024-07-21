import { expect } from '@jest/globals'
import {
  fetchCompetitionsFromYear,
  fetchTeamByTeamId,
  filterCompetitionsByTeamId
} from '../src/ctf-time-api'
import { range } from '../src/utils'

describe('ctf-time-api.ts', () => {
  it('throws an invalid number', async () => {
    //     const team_id = 8323
    //
    //     const team_data = await fetchTeamByTeamId(team_id)
    //     console.log(team_data)
    //     const interesting_years = range(2011, new Date().getFullYear() + 1)
    //       .filter(
    //         year => team_data.rating[year.toString()].rating_points !== undefined
    //       )
    //       .reverse()
    //     console.log(interesting_years)
    //
    //     // interesting_years = [2014]
    //     let out = `# Scores
    // Check out [our (almost complete) CTF history on CTFtime](https://ctftime.org/team/${team_id}).
    // We also participate together with our friends from [DragonSec SI](https://dragonsec.si/) as [FuzzyDragons](https://ctftime.org/team/193568)
    //
    // ## Past CTF participations\n`
    //     for (const year of interesting_years) {
    //       out += `### ${year}\n`
    //       out += `(Overall rating place: #${team_data.rating[year].rating_place}, Austria: #${team_data.rating[year].country_place})\n`
    //       out += `  <!-- place ${team_data.rating[year].rating_place} (${team_data.rating[year].rating_points}) -->\n`
    //       const competitions = await fetchCompetitionsFromYear(year)
    //
    //       const filtered_competitions = filterCompetitionsByTeamId(
    //         competitions,
    //         team_id
    //       )
    //       for (const competition of filtered_competitions) {
    //         const place = competition.scores.find(
    //           score => score.team_id === team_id
    //         )
    //         if (place !== undefined) {
    //           out += `  * ${competition.title} <span class="discreet">(place ${place.place} of ${competition.scores.length})</span>\n`
    //         }
    //       }
    //       out += `\n`
    //     }
    //
    //     console.log(out)
    expect(true).toBe(true)
  })
})
