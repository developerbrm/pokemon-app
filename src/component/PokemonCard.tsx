import { NavLink } from 'react-router'
import { getDetailsPageRoute } from '../Routes/routes'
import { PokemonListResponseItem } from '../utilities/models'
import RenderOtherCardInfo from './RenderOtherCardInfo'

interface PokemonCard {
  pokemon: PokemonListResponseItem
}

const PokemonCard = (props: PokemonCard) => {
  const { pokemon } = props

  return (
    <NavLink to={getDetailsPageRoute(pokemon.name)}>
      <div className="grid h-fit grid-flow-col justify-between rounded-md bg-slate-200 p-5 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 capitalize">
          {pokemon?.name}
        </h3>

        <RenderOtherCardInfo name={pokemon?.name} />
      </div>
    </NavLink>
  )
}

export default PokemonCard
