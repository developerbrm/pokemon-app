import type { BunRequest } from 'bun'
import {
  fetchPokemonDetails,
  fetchPokemonList,
  GETResponseOptions,
  getServerPort,
  LIST_LIMIT,
} from './helpers'

const port = getServerPort()

Bun.serve({
  port,
  routes: {
    '/get_pokemon_list': {
      OPTIONS: () => new Response(null, GETResponseOptions),
      GET: async (req: BunRequest) => {
        try {
          const limit = new URL(req.url).searchParams.get('limit') || LIST_LIMIT
          const offset = new URL(req.url).searchParams.get('offset') || 0
          const pokemonList = await fetchPokemonList({ limit, offset })

          if (!pokemonList) {
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
  },
})

console.log(`Server running on ${port}`)
