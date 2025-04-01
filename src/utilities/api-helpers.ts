import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PokemonData, PokemonListResponse } from './models'

export const LIST_LIMIT = 300

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
