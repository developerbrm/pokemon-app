import axios from 'axios'
import type { BunRequest } from 'bun'
import { GETResponseOptions, getServerPort } from './helpers'
import type { PokemonData, PokemonListResponse } from './types'

const port = getServerPort()
export const LIST_LIMIT = 50

export const GET_SINGLE_POKEMON = (id: string) =>
  `https://pokeapi.co/api/v2/pokemon/${id}`
export const GET_POKEMON_LIST = (limit = LIST_LIMIT, offset = 0) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

export const fetchPokemonList = async (
  limit?: number | string,
  offset?: number | string
) =>
  axios
    .get<PokemonListResponse>(GET_POKEMON_LIST(Number(limit), Number(offset)))
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err)
    })

export const fetchPokemonDetails = async (id: string) =>
  await axios
    .get<PokemonData>(GET_SINGLE_POKEMON(id))
    .then((res) => res.data)
    .catch((err) => {
      // console.log(err)
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
          const offset = new URL(req.url).searchParams.get('offset') || 0
          const pokemonList = await fetchPokemonList(limit, offset)

          if (!pokemonList) {
            return new Response(null, {
              status: 404,
              statusText: 'Not Found',
            })
          }

          const allPokemonDetails = await Promise.all(
            pokemonList.results.map((pokemon) =>
              fetchPokemonDetails(pokemon.name)
            )
          )

          pokemonList.otherCardInfo = allPokemonDetails.map((pokemon) => ({
            height: pokemon.height,
            name: pokemon.name,
            weight: pokemon.weight,
            sprites: pokemon.sprites,
            species: pokemon.species,
          }))

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
