import axios from 'axios'
import type { PokemonData, PokemonListResponse } from './types'
import type { BunRequest, BunResponse } from 'bun'
import { GETResponseOptions, getServerPort } from './helpers'

const port = getServerPort()
export const LIST_LIMIT = 50

export const GET_SINGLE_POKEMON = (id: string) =>
  `https://pokeapi.co/api/v2/pokemon/${id}`
export const GET_POKEMON_LIST = (limit = LIST_LIMIT) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}`

export const fetchPokemonList = async (limit?: number) =>
  axios
    .get<PokemonListResponse>(GET_POKEMON_LIST(limit))
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err)
    })

export const fetchPokemonDetails = async (id: string) =>
  await axios
    .get<PokemonData>(GET_SINGLE_POKEMON(id))
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err)
    })

Bun.serve({
  port,
  routes: {
    '/get_pokemon_list': {
      OPTIONS: () => new Response(null, GETResponseOptions),
      GET: async (req: BunRequest) => {
        try {
          const limit = new URL(req.url).searchParams.get('limit') || LIST_LIMIT
          const pokemonList = await fetchPokemonList(Number(limit))
          return Response.json(pokemonList)
        } catch (err) {
          console.error(err)
          return new Response(null, {
            status: 500,
            statusText: 'Internal Server Error',
          })
        }
      },
    },
  },
})

console.log(`Server running on ${port}`)
