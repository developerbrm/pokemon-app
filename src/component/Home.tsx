import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
import { ScrollRestoration } from 'react-router'
import { getPokemonList } from '../utilities/api-helpers'
import Heading from './Heading'
import PokemonCard from './PokemonCard'
import Spinner from './Spinner'

const Loading = (
  <div className="grid h-screen w-screen place-content-center">
    <Spinner />
  </div>
)

const Home = () => {
  const { data, isPending } = useSuspenseQuery({
    queryKey: ['getPokemonList'],
    queryFn: getPokemonList,
  })

  const [searchKeyword, setSearchKeyword] = useState('')

  const showNoData = data?.results?.some((pokemon) =>
    pokemon.name.includes(searchKeyword)
  )

  if (isPending) return Loading

  return (
    <div>
      <Heading text="Pokemon List" />
      <div className="flex w-full flex-wrap gap-4 p-5 md:items-center md:justify-center">
        <strong className="">Filter Pokemon :</strong>

        <input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value.trim())}
          type="text"
          placeholder="type to search"
          className="block w-full rounded-md border-2 border-slate-600 p-4 py-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out outline-none focus:border-sky-500 md:max-w-xs"
        />
      </div>
      <div className="peer mx-auto grid max-w-7xl grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
        {data?.otherCardInfo.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            searchKeyword={searchKeyword}
            otherCardInfo={pokemon}
          />
        ))}
      </div>
      <div
        className={`grid hidden text-center text-2xl font-bold text-slate-800 peer-empty:block`}
      >
        No Results To Show
      </div>

      <ScrollRestoration />
    </div>
  )
}

export default Home
