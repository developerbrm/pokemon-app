import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { LIST_LIMIT } from '../../server/server-helpers'
import { getPokemonList } from '../utilities/app-helpers'
import CommonLoader from './CommonLoader'
import Heading from './Heading'
import PokemonCard from './PokemonCard'
import WithLoader from './WithLoader'

const observerOptions = {
  threshold: 0.5,
}

const Home = () => {
  // const [searchKeyword, setSearchKeyword] = useState('')
  const { ref, inView } = useInView(observerOptions)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['getPokemonList'],
      initialPageParam: 0,
      queryFn: ({ pageParam = 0 }) =>
        getPokemonList({ limit: LIST_LIMIT, offset: pageParam }),
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + LIST_LIMIT
      },
    })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (data) {
    document.title = `Pokemon App`
  }

  return (
    <WithLoader isLoading={isLoading}>
      <div>
        <Heading className="mx-auto w-fit" text="Pokemon List" />
        {/* <div className="flex w-full flex-wrap gap-4 p-5 md:items-center md:justify-center">
          <strong className="">Filter Pokemon :</strong>

          <input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value.trim())}
            type="text"
            placeholder="type to search"
            className="block w-full rounded-md border-2 border-slate-600 p-4 py-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out outline-none focus:border-sky-500 md:max-w-xs"
          />
        </div> */}

        <div className="peer mx-auto my-5 grid max-w-6xl grid-cols-1 gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
          {data?.pages?.map((data, i) => (
            <React.Fragment key={i}>
              {data?.otherCardInfo.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  // searchKeyword={searchKeyword}
                  otherCardInfo={pokemon}
                />
              ))}
            </React.Fragment>
          ))}
        </div>

        {hasNextPage && (
          <div className="py-20" ref={ref}>
            {isFetchingNextPage && (
              <CommonLoader className="mx-auto !h-full !w-full" />
            )}
          </div>
        )}

        <div
          className={`hidden text-center text-2xl font-bold text-slate-800 peer-empty:grid`}
        >
          No Results To Show
        </div>
      </div>
    </WithLoader>
  )
}

export default Home
