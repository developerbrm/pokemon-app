import { useParams } from 'react-router'
import Heading from './Heading'
import { useAppSelector } from '../redux/store'
import Spinner from './Spinner'
import useFetchPokemonDetails from '../hooks/useFetchPokemonDetails'

const Details = () => {
  const params = useParams<{ name: string }>()
  const name = params.name as string

  const pokemon = useAppSelector(
    (state) => state.pokemonReducer.pokemonDetailsState?.[name]
  )
  useFetchPokemonDetails(name)

  const pokemonListState = useAppSelector(
    (state) => state.pokemonReducer.pokemonDetailsState
  )

  if (pokemonListState.loading && !pokemonListState.loaded) {
    return (
      <div className="grid h-screen w-screen place-content-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl p-5">
      <div className="mr-auto w-fit text-start">
        <Heading text={name} />
      </div>
      <div className="grid grid-cols-[1fr_400px]">
        <div className="grid items-start gap-2 text-slate-600">
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
                  className="flex gap-2 rounded-md bg-blue-50 p-2 py-1 font-medium text-blue-500"
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
                className="flex gap-2 rounded-md bg-blue-50 p-2 py-1 font-medium text-blue-500"
              >
                {move.move.name}
              </span>
            ))}
          </div>
        </div>

        <div className="aspect-square w-full rounded-full">
          <img
            className="h-full w-full object-contain drop-shadow-md"
            src={pokemon?.sprites.other['official-artwork'].front_default}
            alt={pokemon?.name}
          />
        </div>
      </div>
    </div>
  )
}

export default Details
