import { Suspense, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchPokemonList, LIST_LIMIT } from '../utilities/api-helpers'
import Heading from './Heading'
import PokemonCard from './PokemonCard'
import Spinner from './Spinner'

const Home = () => {
  const dispatch = useAppDispatch()
  const { pokemonListState } = useAppSelector((state) => state.pokemonReducer)
  const [searchKeyword, setSearchKeyword] = useState('')

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

  const showNoData = !pokemonListState.data?.results?.some((pokemon) =>
    pokemon.name.includes(searchKeyword)
  )

  return (
    <div className="">
      <Heading text="Pokemon List" />
      <div className="flex items-center justify-center gap-4">
        <strong className="">Filter Pokemon :</strong>

        <input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          type="text"
          placeholder="type to search"
          className="rounded-md border-2 border-slate-600 p-4 py-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out outline-none focus:border-sky-500"
        />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
        {pokemonListState.data?.results?.map((pokemon) => (
          <Suspense key={pokemon.name} fallback={<Spinner />}>
            <PokemonCard searchKeyword={searchKeyword} pokemon={pokemon} />
          </Suspense>
        ))}
      </div>
      <div
        className={`grid text-center text-2xl font-bold text-slate-800 ${showNoData ? '' : 'hidden'}`}
      >
        No Results To Show
      </div>
    </div>
  )
}

export default Home
