import * as http from '@actions/http-client'

/**
 * Interface representing the rating details of a team.
 */
interface Rating {
  rating_place?: number
  organizer_points?: number
  rating_points?: number
  country_place?: number
}

/**
 * Interface representing the rating of a team over multiple years.
 */
interface TeamRating {
  [year: string]: Rating
}

/**
 * Interface representing the details of a team.
 */
interface TeamDetails {
  academic: boolean
  primary_alias: string
  university_website: string
  name: string
  rating: TeamRating
  logo: string
  country: string
  university: string
  id: number
  aliases: string[]
}

/**
 * Fetches the details of a team by its team ID.
 *
 * @param team_id - The ID of the team to fetch details for.
 * @returns A promise that resolves to the team details.
 * @throws Error Will throw an error if no team is found for the given team ID.
 */
export async function fetchTeamByTeamId(team_id: number): Promise<TeamDetails> {
  const client: http.HttpClient = new http.HttpClient('CTFTime Crawler')
  const response = await client.getJson<TeamDetails>(
    `https://ctftime.org/api/v1/teams/${team_id}/`
  )
  if (response.result === null) {
    throw new Error(`No team found for the team id ${team_id}`)
  }
  return response.result
}

/**
 * Interface representing the score of a team in a competition.
 */
interface Score {
  team_id: number
  points: string
  place: number
}

/**
 * Interface representing a competition.
 */
interface Competition {
  title: string
  scores: Score[]
  time: number
}

/**
 * Interface representing multiple competitions.
 */
interface Competitions {
  [key: string]: Competition
}

/**
 * Fetches the competitions from a specific year.
 *
 * @param year - The year to fetch competitions for.
 * @returns A promise that resolves to the competitions of the given year.
 * @throws Error Will throw an error if no competition is found for the given year.
 */
export async function fetchCompetitionsFromYear(
  year: number
): Promise<Competitions> {
  const client: http.HttpClient = new http.HttpClient('CTFTime Crawler')
  const response = await client.getJson<Competitions>(
    `https://ctftime.org/api/v1/results/${year}/`
  )
  if (response.result === null) {
    throw new Error(`No competition found for the year ${year}`)
  }
  return response.result
}

/**
 * Filters competitions by a specific team ID.
 *
 * @param competitions - The competitions to filter.
 * @param teamId - The team ID to filter competitions by.
 * @returns An array of competitions that include the specified team ID.
 */
export function filterCompetitionsByTeamId(
  competitions: Competitions,
  teamId: number
): Competition[] {
  const filteredEntries: Competition[] = []

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [key, competition] of Object.entries(competitions)) {
    if (competition.scores.some(score => score.team_id === teamId)) {
      filteredEntries.push(competition)
    }
  }

  return filteredEntries.reverse()
}
