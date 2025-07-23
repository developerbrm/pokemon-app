import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { appendSlash, removeStartSlash } from '.'
import { getServerPort } from '../../server/helpers'
import type { PokemonListResponse } from '../../server/types'
import { PokemonData } from './models'

export const LIST_LIMIT = 150

export const GET_SINGLE_POKEMON = (id: string) =>
  `https://pokeapi.co/api/v2/pokemon/${id}`
export const GET_POKEMON_LIST = (limit = LIST_LIMIT) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}`

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (limit?: number) =>
    axios
      .get<PokemonListResponse>(GET_POKEMON_LIST(limit))
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err)
      })
)

export const fetchPokemonDetails = async (id: string) =>
  axios
    .get<PokemonData>(GET_SINGLE_POKEMON(id))
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err)
    })

const port = getServerPort()

export const BASE_SERVER_URL =
  import.meta.env.VITE_BASE_SERVER_URL ?? `http://localhost:${port}`

export const constructApiUrl = (route: string) => {
  const formattedBaseUrl = appendSlash(BASE_SERVER_URL)
  const formattedRoute = removeStartSlash(route)

  const finalUrl = `${formattedBaseUrl}${formattedRoute}`
  return finalUrl
}

export const getPokemonList = async () => {
  try {
    const url = constructApiUrl('/get_pokemon_list')
    const res = await fetch(url)
    const data: PokemonListResponse = await res.json()

    return data
  } catch (error) {
    console.log(error)

    return null
  }
}
