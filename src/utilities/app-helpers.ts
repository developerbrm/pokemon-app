import axios from 'axios'
import { appendSlash, removeStartSlash } from '.'
import { getServerPort } from '../../server/server-helpers'
import type {
  GetPokemonListParams,
  PokemonListResponse,
} from '../../server/types'

const port = getServerPort()

export const BASE_SERVER_URL =
  import.meta.env.VITE_BASE_SERVER_URL ?? `http://localhost:${port}`

export const constructApiUrl = (route: string) => {
  const formattedBaseUrl = appendSlash(BASE_SERVER_URL)
  const formattedRoute = removeStartSlash(route)

  const finalUrl = `${formattedBaseUrl}${formattedRoute}`
  return finalUrl
}

export const getPokemonList = async (params?: GetPokemonListParams) => {
  try {
    const url = constructApiUrl('/get_pokemon_list')

    const res = await axios.get<PokemonListResponse>(url, { params })

    return res.data
  } catch (error) {
    console.log(error)

    return null
  }
}
