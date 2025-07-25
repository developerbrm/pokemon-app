import { GetPokemonDetailsParams } from '../../server/types'

export const BASE_URL = `/pokemon-app`

export const ROUTES = {
  HOME: BASE_URL,
  DETAILS: `${BASE_URL}/details/:id`,
}

export const getDetailsPageRoute = (params: GetPokemonDetailsParams) =>
  `${BASE_URL}/details/${params.id}`
