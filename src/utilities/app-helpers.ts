import axios, { AxiosError } from 'axios'
import { appendSlash, removeStartSlash } from '.'
import { API_ROUTES, getServerPort } from '../../server/server-helpers'
import type {
  GetFeaturedPokemons,
  GetPokemonDetailsParams,
  GetPokemonListParams,
  PokemonData,
  PokemonListResponse,
} from '../../server/types'

const port = getServerPort()

export const BASE_SERVER_URL =
  import.meta.env.VITE_BASE_SERVER_URL ?? `http://localhost:${port}`

export const BASE_APP_URL = import.meta.env.BASE_URL

export const constructApiUrl = (route: string) => {
  const formattedBaseUrl = appendSlash(BASE_SERVER_URL)
  const formattedRoute = removeStartSlash(route)

  const finalUrl = `${formattedBaseUrl}${formattedRoute}`
  return finalUrl
}

export const constructPubicMediaUrl = (imageUrl: string) => {
  const baseUrl = appendSlash(BASE_APP_URL)
  const endPoint = removeStartSlash(imageUrl)

  return `${baseUrl}${endPoint}`
}

export const getPokemonList = async (params?: GetPokemonListParams) => {
  try {
    const url = constructApiUrl(API_ROUTES.GET_POKEMON_LIST)
    const res = await axios.get<PokemonListResponse>(url, { params })

    return res.data
  } catch (error) {
    console.log(error)

    return null
  }
}

export const getPokemonDetails = async (params?: GetPokemonDetailsParams) => {
  const url = constructApiUrl(API_ROUTES.GET_POKEMON_DETAILS)

  return await axios
    .get<PokemonData>(url, { params })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      console.log(err.response?.data)

      throw new Error(err.message)
    })
}

export const getFeaturedPokemons = async (params?: GetFeaturedPokemons) => {
  const url = constructApiUrl(API_ROUTES.GET_FEATURED_POKEMONS)

  return await axios
    .get<PokemonData[]>(url, { params })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      console.log(err.response?.data)

      throw new Error(err.message)
    })
}
