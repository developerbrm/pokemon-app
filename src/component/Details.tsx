import { useCallback, useEffect, useRef } from 'react'
import { NavLink, ScrollRestoration, useParams } from 'react-router'
import useFetchPokemonDetails from '../hooks/useFetchPokemonDetails'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { ROUTES } from '../Routes/routes'
import { fetchPokemonList, LIST_LIMIT } from '../utilities/api-helpers'
import Heading from './Heading'
import PokemonCard from './PokemonCard'
import Spinner from './Spinner'

const Details = () => {
  const params = useParams<{ name: string }>()
  const name = params.name as string
  const { pokemonListState } = useAppSelector((state) => state.pokemonReducer)
  const dispatch = useAppDispatch()
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToTop = useCallback(() => {
    // if (containerRef.current) {
    //   containerRef.current.scrollTo({
    //     top: 0,
    //     behavior: 'smooth',
    //   })
    // }
  }, [containerRef])

  const pokemon = useAppSelector(
    (state) => state.pokemonReducer.pokemonDetailsState?.[name]
  )

  const pokemonDetailsState = useFetchPokemonDetails(name)

  useEffect(() => {
    if (pokemonDetailsState.loaded) return

    dispatch(fetchPokemonList(LIST_LIMIT))
  }, [dispatch, pokemonDetailsState.loaded])

  useEffect(() => {
    scrollToTop()
  }, [scrollToTop])

  if (pokemonDetailsState.loading && !pokemonDetailsState.loaded) {
    return (
      <div className="grid h-screen w-screen place-content-center">
        <Spinner />
      </div>
    )
  }

  const nextPokemonIndex =
    pokemonListState.data?.results?.findIndex(
      (pokemon) => pokemon.name === name
    ) + 1

  const featuredPokemonArr = nextPokemonIndex
    ? pokemonListState.data?.results
        ?.slice(nextPokemonIndex, nextPokemonIndex + 3)
        .filter((pokemon) => pokemon.name !== name)
    : []

  return (
    <section ref={containerRef} className="mx-auto max-w-7xl p-5">
      <div className="mr-auto w-fit text-start">
        <Heading text={name} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
        <div className="mx-auto aspect-square w-[300px] rounded-full bg-gradient-to-b from-lime-300 to-white to-[300px] md:w-[350px] lg:order-2 lg:w-[400px]">
          <img
            className="h-full w-full object-contain drop-shadow-md"
            src={pokemon?.sprites.other['official-artwork'].front_default}
            alt={pokemon?.name}
          />
        </div>

        <div className="grid items-start gap-2 text-slate-600 lg:order-1">
          <div className="flex flex-wrap items-center gap-2 gap-x-6">
            <div>
              <strong>Height:</strong> {pokemon?.height}
            </div>

            <div>
              <strong>Species:</strong> {pokemon?.species.name}
            </div>

            <div>
              <strong>Weight:</strong> {pokemon?.weight} kg
            </div>

            {pokemon?.stats.map((stat) => (
              <div key={stat.stat.name} className="flex gap-2">
                <strong>
                  {stat.stat.name.charAt(0).toUpperCase() +
                    stat.stat.name.slice(1)}
                  :
                </strong>
                {stat.base_stat}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-nowrap">
            <strong>Abilities:</strong>
            <div className="flex gap-2">
              {pokemon?.abilities.map((ability) => (
                <span
                  key={ability.ability.name}
                  className="flex gap-2 rounded-md bg-blue-100 p-2 py-1 font-medium text-blue-500"
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-nowrap">
            <strong>Moves:</strong>
            {pokemon?.moves.map((move) => (
              <span
                key={move.move.name}
                className="flex gap-2 rounded-md bg-blue-100 p-2 py-1 font-medium text-blue-500"
              >
                {move.move.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={`mt-10 md:mt-18`}>
        <div
          className={`${!featuredPokemonArr?.length && 'hidden'} mr-auto w-fit text-start`}
        >
          <Heading text="Similar Pokemons" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredPokemonArr?.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              searchKeyword={''}
              pokemon={pokemon}
              handleOnClick={scrollToTop}
            />
          ))}
        </div>
        <div className="mx-auto mt-10 flex justify-center md:mt-18">
          <NavLink
            className="mx-auto w-fit rounded-md bg-blue-50 p-4 py-2 font-medium text-blue-500 transition hover:bg-blue-500 hover:text-white"
            to={ROUTES.HOME}
          >
            Back to home
          </NavLink>
        </div>
      </div>

      <ScrollRestoration />
    </section>
  )
}

export default Details
