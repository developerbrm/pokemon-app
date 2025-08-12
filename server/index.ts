import {
  API_ROUTES,
  fetchPokemonDetails,
  fetchPokemonList,
  GETResponseOptions,
  getServerPort,
  LIST_LIMIT,
} from './server-helpers'
import type { PokemonData } from './types'

const port = getServerPort()

Bun.serve({
  port,
  async fetch(request: Request) {
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    try {
      if (method === 'OPTIONS') {
        return new Response(null, GETResponseOptions)
      }

      if (path === API_ROUTES['GET_POKEMON_LIST']) {
        if (method === 'GET') {
          const limit = url.searchParams.get('limit') || LIST_LIMIT
          const offset = url.searchParams.get('offset') || 0
          const pokemonList = await fetchPokemonList({
            limit: Number(limit),
            offset: Number(offset),
          })

          if (!pokemonList.count) {
            return new Response(null, {
              ...GETResponseOptions,
              status: 404,
              statusText: 'Not Found',
            })
          }

          const allPokemonDetails =
            (await Promise.allSettled(
              pokemonList.results.map((pokemon) =>
                fetchPokemonDetails(pokemon.name)
              )
            )
              .then((res) => res.filter((r) => r.status === 'fulfilled'))
              .then((res) => res.map((r) => r.value))
              .catch(console.error)) ?? ([] as PokemonData[])

          if (!allPokemonDetails.length || !pokemonList.results.length) {
            return Response.json(null, {
              ...GETResponseOptions,
              status: 404,
              statusText: 'Not Found',
            })
          }

          pokemonList.otherCardInfo = allPokemonDetails
            .filter((pokemon) => pokemon !== null)
            .map((pokemon) => ({
              height: pokemon.height,
              name: pokemon.name,
              weight: pokemon.weight,
              sprites: pokemon.sprites,
              species: pokemon.species,
              id: pokemon.id,
            }))

          return Response.json(pokemonList, GETResponseOptions)
        }
      } else if (path === API_ROUTES['GET_POKEMON_DETAILS']) {
        if (method === 'GET') {
          const id = url.searchParams.get('id') as string
          const details = await fetchPokemonDetails(id)

          if (!details) {
            return Response.json(null, {
              ...GETResponseOptions,
              status: 404,
              statusText: 'Not Found',
            })
          }

          return Response.json(details, GETResponseOptions)
        }
      } else if (path === API_ROUTES['GET_FEATURED_POKEMONS']) {
        if (method === 'GET') {
          const id = Number(url.searchParams.get('id'))
          const nextIds = [id + 1, id + 2, id + 3].map((id) => id.toString())

          const otherPokemonDetailsArr = await Promise.allSettled(
            nextIds.map((id) => fetchPokemonDetails(id))
          )
            .then((res) => res.filter((r) => r.status === 'fulfilled'))
            .then((res) => res.map((r) => r.value))
            .then((res) => res.filter(Boolean))
            .catch(console.error)

          if (!otherPokemonDetailsArr?.length) {
            return Response.json(null, {
              ...GETResponseOptions,
              status: 404,
              statusText: 'Not Found',
            })
          }

          const data = otherPokemonDetailsArr

          return Response.json(data, GETResponseOptions)
        }
      }

      return new Response('Not Found', {
        ...GETResponseOptions,
        status: 404,
      })
    } catch (err) {
      console.error(err)
      return new Response('Internal Server Error', {
        ...GETResponseOptions,
        status: 500,
        statusText: 'Internal Server Error',
      })
    }
  },
  error(error: Error) {
    console.error('Bun server error:', error)
    return new Response('Bun Server Error', { status: 500 })
  },

  idleTimeout: 30,
})

console.log(`Server running on http://localhost:${port}`)
