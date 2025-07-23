import { NavLink } from 'react-router'
import type { PokemonOtherCardInfoData } from '../../server/types'
import { getDetailsPageRoute } from '../Routes/routes'
import RenderOtherCardInfo from './RenderOtherCardInfo'

interface PokemonCard {
  pokemon: PokemonOtherCardInfoData
  searchKeyword: string
  handleOnClick?: () => void
}

const PokemonCard = (props: PokemonCard) => {
  const { pokemon, searchKeyword, handleOnClick } = props

  if (!pokemon.name.includes(searchKeyword)) return null

  return (
    <NavLink onClick={handleOnClick} to={getDetailsPageRoute(pokemon.name)}>
      <div className="grid h-[200px] grid-flow-col justify-between rounded-md bg-slate-200 p-5 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 capitalize">
          {pokemon?.name}
        </h3>

        <RenderOtherCardInfo name={pokemon?.name} />
      </div>
    </NavLink>
  )
}

export default PokemonCard
