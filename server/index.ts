import type { BunRequest } from 'bun'
import {
  API_ROUTES,
  fetchPokemonDetails,
  fetchPokemonList,
  GETResponseOptions,
  getServerPort,
  LIST_LIMIT,
} from './server-helpers'

const port = getServerPort()

Bun.serve({
  port,
  routes: {
    [API_ROUTES['GET_POKEMON_LIST']]: {
      OPTIONS: () => new Response(null, GETResponseOptions),
      GET: async (req: BunRequest) => {
        try {
          const limit = new URL(req.url).searchParams.get('limit') || LIST_LIMIT
          const offset = new URL(req.url).searchParams.get('offset') || 0
          const pokemonList = await fetchPokemonList({ limit, offset })

          if (!pokemonList.count) {
            return new Response(null, {
              ...GETResponseOptions,
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
            id: pokemon.id,
          }))

          return Response.json(pokemonList, GETResponseOptions)
        } catch (err) {
          console.error(err)
          return new Response(null, {
            ...GETResponseOptions,
            status: 500,
            statusText: 'Internal Server Error',
          })
        }
      },
    },
    [API_ROUTES['GET_POKEMON_DETAILS']]: {
      OPTIONS: () => new Response(null, GETResponseOptions),
      GET: async (req: BunRequest) => {
        try {
          const id = new URL(req.url).searchParams.get('id') as string
          const details = await fetchPokemonDetails(id)

          if (!details) {
            return new Response(null, {
              ...GETResponseOptions,
              status: 404,
              statusText: 'Not Found',
            })
          }

          return Response.json(details, GETResponseOptions)
        } catch (err) {
          console.error(err)
          return new Response(null, {
            ...GETResponseOptions,
            status: 500,
            statusText: 'Internal Server Error',
          })
        }
      },
    },
    [API_ROUTES['GET_FEATURED_POKEMONS']]: {
      OPTIONS: () => new Response(null, GETResponseOptions),
      GET: async (req: BunRequest) => {
        try {
          const id = Number(new URL(req.url).searchParams.get('id'))
          const nextIds = [id + 1, id + 2, id + 3].map((id) => id.toString())

          const otherPokemonDetailsArr = await Promise.allSettled(
            nextIds.map((id) => fetchPokemonDetails(id))
          )
            .then((res) => res.filter((r) => r.status === 'fulfilled'))
            .then((res) => res.map((r) => r.value))
            .catch(console.log)

          if (!otherPokemonDetailsArr?.length) {
            return new Response(null, {
              ...GETResponseOptions,
              status: 404,
              statusText: 'Not Found',
            })
          }

          const data = otherPokemonDetailsArr

          return Response.json(data, GETResponseOptions)
        } catch (err) {
          console.error(err)
          return new Response(null, {
            ...GETResponseOptions,
            status: 500,
            statusText: 'Internal Server Error',
          })
        }
      },
    },
  },
})

console.log(`Server running on ${port}`)
