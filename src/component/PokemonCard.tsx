import { NavLink } from 'react-router'
import useFetchPokemonDetails from '../hooks/useFetchPokemonDetails'
import { getDetailsPageRoute } from '../Routes/routes'
import { PokemonListResponseItem } from '../utilities/models'

interface PokemonCard {
  pokemon: PokemonListResponseItem
}

const PokemonCard = (props: PokemonCard) => {
  const { pokemon } = props

  useFetchPokemonDetails(pokemon?.name)

  return (
    <NavLink to={getDetailsPageRoute(pokemon.name)}>
      <div className="grid h-[100px] rounded-md bg-slate-200 p-5 shadow-sm">
        <h3 className="text-lg font-medium text-slate-800 capitalize">
          {pokemon.name}
        </h3>
      </div>
    </NavLink>
  )
}

export default PokemonCard
