import { useParams } from 'react-router'
import useFetchPokemonDetails from '../hooks/useFetchPokemonDetails'
import { useAppSelector } from '../redux/store'
import Heading from './Heading'
import Spinner from './Spinner'

const Details = () => {
  const params = useParams<{ name: string }>()
  const name = params.name as string

  const pokemon = useAppSelector(
    (state) => state.pokemonReducer.pokemonDetailsState?.[name]
  )

  const pokemonDetailsState = useFetchPokemonDetails(name)

  if (pokemonDetailsState.loading && !pokemonDetailsState.loaded) {
    return (
      <div className="grid h-screen w-screen place-content-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="mx-auto h-screen max-w-7xl overflow-y-auto p-5">
      <div className="mr-auto w-fit text-start">
        <Heading text={name} />
      </div>
      <div className="grid lg:grid-cols-[1fr_auto]">
        <div className="aspect-square w-[300px] rounded-full bg-gradient-to-b from-lime-300 to-white to-[300px] md:w-[350px] lg:order-2 lg:w-[400px]">
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
    </div>
  )
}

export default Details
