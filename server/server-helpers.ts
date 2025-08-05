import axios from 'axios'
import type {
  GetPokemonListParams,
  PokemonData,
  PokemonListResponse,
} from './types'

export const API_ROUTES = {
  GET_POKEMON_LIST: `/get_pokemon_list`,
  GET_POKEMON_DETAILS: `/get_pokemon_details`,
  GET_FEATURED_POKEMONS: `/get_featured_pokemons`,
}

export const getServerPort = () => {
  let port

  try {
    port = process.env.PORT
  } catch (error) {
    console.log(error)
  }

  return port ?? import.meta.env.VITE_SERVER_PORT ?? 3000
}

export const commonResponseOptions = {
  headers: {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
}

export const GETResponseOptions = {
  ...commonResponseOptions,
  'Access-Control-Allow-Methods': 'GET',
  'Content-Type': 'application/json',
}

export const LIST_LIMIT = 30

export const GET_SINGLE_POKEMON = (id: string) =>
  `https://pokeapi.co/api/v2/pokemon/${id}`
export const GET_POKEMON_LIST = ({
  limit = LIST_LIMIT,
  offset = 0,
}: GetPokemonListParams) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

export const fetchPokemonList = async (params: GetPokemonListParams) =>
  axios
    .get<PokemonListResponse>(GET_POKEMON_LIST(params))
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err)
    })

export const fetchPokemonDetails = async (id: string) =>
  await axios
    .get<PokemonData>(GET_SINGLE_POKEMON(id))
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
      throw new Error(err)
    })
