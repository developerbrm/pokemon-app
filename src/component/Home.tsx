import { Suspense, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Spinner from './Spinner'
import PokemonCard from './PokemonCard'
import Heading from './Heading'
import { fetchPokemonList, LIST_LIMIT } from '../utilities/api-helpers'

const Home = () => {
  const dispatch = useAppDispatch()
  const { pokemonListState } = useAppSelector((state) => state.pokemonReducer)

  useEffect(() => {
    dispatch(fetchPokemonList(LIST_LIMIT))
  }, [dispatch])

  if (pokemonListState.loading && !pokemonListState.loaded) {
    return (
      <div className="grid h-screen w-screen place-content-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="">
      <Heading text="Pokemon List" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
        {pokemonListState.data?.results?.map((pokemon) => (
          <Suspense key={pokemon.name} fallback={<Spinner />}>
            <PokemonCard pokemon={pokemon} />
          </Suspense>
        ))}
      </div>
    </div>
  )
}

export default Home
