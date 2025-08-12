import { useQuery } from '@tanstack/react-query'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router'
import { GetPokemonDetailsParams } from '../../server/types'
import { ROUTES } from '../Routes/routes'
import { getPokemonDetails } from '../utilities/app-helpers'
import FeaturedPokemons from './FeaturedPokemons'
import Heading from './Heading'
import WithLoader from './WithLoader'
import { capitalizeFirstLetter } from '../utilities'

const abilitiesMovesOuterClasses = `rounded-md bg-gradient-to-r from-indigo-700/10 to-indigo-500/10 p-2 py-1 `
const abilitiesMovesClasses =
  'flex gap-2 font-medium text-gradient from-indigo-700 to-indigo-500'

const Details = () => {
  const params = useParams<GetPokemonDetailsParams>()
  const { id = '0' } = params
  const navigate = useNavigate()

  const handleBackClick = () => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate(ROUTES.HOME)
    }
  }

  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: [id],
    queryFn: () => getPokemonDetails({ id }),
  })

  if (error || (!pokemon && !isLoading)) {
    setTimeout(() => {
      navigate(ROUTES.HOME)
    }, 5000)

    return (
      <div className="mx-auto grid h-screen place-content-center bg-slate-300 p-10 text-center">
        <div className="mx-auto max-w-prose">
          <h1 className="text-gradient mb-2 text-4xl font-bold">
            We could not find this pokemon
          </h1>
          <p className="text-lg">Flying you to the home page in 5 seconds 🚀</p>
        </div>
      </div>
    )
  }

  if (pokemon) {
    document.title = `${capitalizeFirstLetter(pokemon.name)} | Pokemon App`
  }

  return (
    <WithLoader isLoading={isLoading}>
      <section className="mx-auto max-w-6xl p-5">
        <div className="relative my-5 flex w-full items-center justify-start gap-2 text-start">
          <button
            title="Go back to home"
            className="inline-block cursor-pointer rounded-md bg-blue-50 p-2 font-medium text-blue-500 transition hover:bg-blue-500 hover:text-white lg:absolute lg:top-1/2 lg:-left-12 lg:-translate-y-1/2"
            onClick={handleBackClick}
          >
            <IoIosArrowBack size={20} />
          </button>
          <Heading className="!m-0" text={pokemon?.name ?? ''} />
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
          <div className="mx-auto aspect-square w-[300px] rounded-full bg-gradient-to-b from-lime-300 to-white to-[300px] md:w-[350px] lg:order-2 lg:w-[400px]">
            <img
              className="h-full w-full object-contain drop-shadow-lg/40"
              src={pokemon?.sprites.other['official-artwork'].front_default}
              alt={pokemon?.name}
            />
          </div>
          <div className="grid items-start gap-2 text-slate-700 lg:order-1">
            <div className="flex flex-wrap items-center gap-2 gap-x-6">
              <div>
                <strong className="text-slate-800">Height:</strong>{' '}
                {pokemon?.height}
              </div>
              <div>
                <strong className="text-slate-800">Species:</strong>{' '}
                {pokemon?.species.name}
              </div>
              <div>
                <strong className="text-slate-800">Weight:</strong>{' '}
                {pokemon?.weight} kg
              </div>
              {pokemon?.stats.map((stat) => (
                <div key={stat.stat.name} className="flex gap-2">
                  <strong className="text-slate-800">
                    {stat.stat.name.charAt(0).toUpperCase() +
                      stat.stat.name.slice(1)}
                    :
                  </strong>
                  {stat.base_stat}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-nowrap">
              <strong className="text-slate-800">Abilities:</strong>
              <div className="flex gap-2">
                {pokemon?.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className={abilitiesMovesOuterClasses}
                  >
                    <span className={abilitiesMovesClasses}>
                      {ability.ability.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-nowrap">
              <strong className="text-slate-800">Moves:</strong>
              {pokemon?.moves.map((move) => (
                <span
                  key={move.move.name}
                  className={abilitiesMovesOuterClasses}
                >
                  <span className={abilitiesMovesClasses}>
                    {move.move.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={`mt-10 md:mt-18`}>
          <FeaturedPokemons id={id} />

          <div className="mx-auto mt-10 flex justify-center md:mt-18">
            <button
              title="Go back to home"
              className="mx-auto flex w-fit cursor-pointer items-center justify-center gap-1 rounded-md bg-blue-50 p-4 py-2 font-medium text-blue-500 transition hover:bg-blue-500 hover:text-white"
              onClick={handleBackClick}
            >
              <IoIosArrowBack />

              <span>Back to home</span>
            </button>
          </div>
        </div>
      </section>
    </WithLoader>
  )
}

export default Details
