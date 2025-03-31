import useFetchPokemonDetails from '../hooks/useFetchPokemonDetails'
import { useAppSelector } from '../redux/store'

const RenderOtherCardInfo = ({ name }: { name: string }) => {
  const pokemonDetailsState = useFetchPokemonDetails(name)

  const pokemon = useAppSelector(
    (state) => state.pokemonReducer.pokemonDetailsState?.[name]
  )

  if (pokemonDetailsState.loading && !pokemonDetailsState.loaded) {
    return (
      <div className="grid h-screen w-screen place-content-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="col-span-2 row-start-2 grid w-full grid-flow-col justify-between">
      <div className="gap-2 self-end text-slate-800">
        <div>
          <strong>Height:</strong> {pokemon?.height}
        </div>

        <div>
          <strong>Species:</strong> {pokemon?.species.name}
        </div>

        <div>
          <strong>Weight:</strong> {pokemon?.weight} kg
        </div>
      </div>
      <div className="aspect-square w-[120px]">
        <img
          className="h-full w-full object-contain drop-shadow-md"
          src={pokemon?.sprites.other['official-artwork'].front_default}
          alt={pokemon?.name}
        />
      </div>
    </div>
  )
}

export default RenderOtherCardInfo
