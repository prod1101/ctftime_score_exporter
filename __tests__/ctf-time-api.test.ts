import { expect } from '@jest/globals'
import * as http from '@actions/http-client'
import {
  fetchCompetitionsFromYear,
  fetchTeamByTeamId,
  filterCompetitionsByTeamId
} from '../src/ctf-time-api'

jest.mock('http')

describe('ctf-time-api.mock.ts', () => {
  it('Test no team found for team id', async () => {
    http.HttpClient.prototype.getJson = jest.fn().mockResolvedValue({
      result: null
    })
    const team_id = 0
    await expect(fetchTeamByTeamId(team_id)).rejects.toThrow(
      `No team found for the team id ${team_id}`
    )
  })

  it('Test team found for team id', async () => {
    http.HttpClient.prototype.getJson = jest.fn().mockResolvedValue({
      result: {
        academic: false,
        primary_alias: 'test',
        university_website: 'test',
        name: 'test',
        rating: {},
        logo: 'test',
        country: 'test',
        university: 'test',
        id: 0,
        aliases: []
      }
    })
    const team_id = 0
    const team = await fetchTeamByTeamId(team_id)
    expect(team).toEqual({
      academic: false,
      primary_alias: 'test',
      university_website: 'test',
      name: 'test',
      rating: {},
      logo: 'test',
      country: 'test',
      university: 'test',
      id: 0,
      aliases: []
    })
  })

  it('Test no competition found for year', async () => {
    http.HttpClient.prototype.getJson = jest.fn().mockResolvedValue({
      result: null
    })
    const year = 0
    await expect(fetchCompetitionsFromYear(year)).rejects.toThrow(
      `No competition found for the year ${year}`
    )
  })

  it('Test competition found for year', async () => {
    http.HttpClient.prototype.getJson = jest.fn().mockResolvedValue({
      result: {
        test: {
          title: 'test',
          scores: [],
          time: 0
        }
      }
    })
    const year = 0
    const competitions = await fetchCompetitionsFromYear(year)
    expect(competitions).toEqual({
      test: {
        title: 'test',
        scores: [],
        time: 0
      }
    })
  })

  it('Test filter competitions by team id', () => {
    const competitions = {
      test: {
        title: 'test',
        scores: [
          {
            team_id: 0,
            points: '0',
            place: 0
          }
        ],
        time: 0
      }
    }
    const team_id = 0
    const filteredCompetitions = filterCompetitionsByTeamId(
      competitions,
      team_id
    )
    expect(filteredCompetitions).toEqual([
      {
        scores: [{ place: 0, points: '0', team_id: 0 }],
        time: 0,
        title: 'test'
      }
    ])
  })
})
