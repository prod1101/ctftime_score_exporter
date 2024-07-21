import * as http from '@actions/http-client'

interface Rating {
  rating_place?: number
  organizer_points?: number
  rating_points?: number
  country_place?: number
}

interface TeamRating {
  [year: string]: Rating
}

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

interface Score {
  team_id: number
  points: string
  place: number
}

interface Competition {
  title: string
  scores: Score[]
  time: number
}

interface Competitions {
  [key: string]: Competition
}

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
